create table sector
(
    id   serial primary key,
    name varchar(64) not null unique
        check ( length(name) > 0 )
);

create table system
(
    id     serial primary key,
    name   varchar(64)  not null unique
        check ( length(name) > 0 ),
    sector_id int          not null
        references sector
            on delete cascade
            on update cascade,
    image  varchar(255) not null

);

create table spacebase_type
(
    id          serial primary key,
    name        varchar(32)  not null unique check ( length(name) > 0 ),
    description varchar(512),
    image varchar(255) not null,
    rating_down int check (rating_down < 100 and rating_down >= -100
        ),
    rating_up   int check ( rating_up >= -100 and rating_up <= 100 and rating_down < rating_up)
);


create table spacebase
(
    id                serial primary key,
    name              varchar(64) not null unique check ( length(name) > 0 ),
    spacebase_type_id int         not null references spacebase_type on delete restrict
        on update cascade,    -- no reason to delete the type

    system_id         int         not null
        references system
            on delete cascade -- delete a systemSR - delete everything
            on update cascade,
    coord_x int not null,
    coord_y int not null
);

create table politics
(
    id          serial primary key,
    name        varchar(32)  not null
        check ( length(name) > 0 ),
    description varchar(512) not null
        check ( length(description) > 0 )
);

create table economics
(
    id          serial primary key,
    name        varchar(32)  not null
        check ( length(name) > 0 ),
    description varchar(256) not null
        check ( length(description) > 0 )
);

create table race
(
    id          serial primary key,
    name        varchar(32)  not null
        check ( length(name) > 0 ),
    description varchar(256) not null
        check ( length(description) > 0 )
);

create table planet
(

    id        serial primary key,
    name      varchar(64)                             not null unique check ( length(name) > 0 ),
    system_id    int references system on delete cascade not null,
    citizens  int                                     not null
        check ( citizens >= 0 ), -- citizens - кол-во жителей (в тыс.)
    politics_id  int
        references politics
            on delete set null
            on update cascade,
    economics_id int
        references economics
            on delete set null
            on update cascade
        check ( (citizens = 0 and politics_id is null and economics_id is null) or
                (citizens > 0 and politics_id is not null and economics_id is not null)),

    image     varchar(255)                            not null,

    coord_x   int                                     not null,
    coord_y   int                                     not null


);

create table action_type
(
    id            serial primary key,
    name          varchar(128) not null unique
        check ( length(name) > 0 ),
    action_impact int          not null
        check
            (
                action_impact >= -10
                and action_impact <= 10
            )
);


create table username
(
    id       serial primary key,
    login    varchar(64) unique           not null,
    password varchar(64)                  not null
);

create table pilot
(
    id          serial primary key,
    name        varchar(64)                                   not null unique
        check ( length(name) > 0 ),
    description varchar(256)
        check ( length(description) > 0),
    race_id     int
        references race
            on delete set null
            on update cascade,
    rating      int                                           not null default 0,

    owner       integer references username on delete cascade not null,
    image       varchar(255)                                  not null

);

create table spaceship_type
(
    id          serial primary key,
    name        varchar(32) not null unique
        check ( length(name) > 0 ),
    description varchar(256)
);

create table spaceship
(
    id                serial primary key,
    name              varchar(64)                             not null unique,
    spaceship_type_id int                                     not null
        references spaceship_type
            on delete set null
            on update cascade,
    pilot_id          int references pilot                    not null
        references pilot
            on delete cascade -- spaceship without pilot doesn't exist
            on update cascade,
    system_id         int references system on delete cascade not null,
    image             varchar(255)                            not null

);

create table action
(
    id                 serial primary key,
    date               timestamp not null default now(),
    action_description text,
    pilot_id           int  not null
        references pilot
            on delete cascade
            on update cascade,
    action_type_id     int  not null
        references action_type
            on delete restrict
            on update cascade
);

create table living_races
(
    id        serial primary key,
    race_id   int
        references race
            on delete cascade
            on update cascade not null,
    planet_id int
        references planet
            on delete cascade
            on update cascade not null,
    unique (race_id, planet_id)
);

create table landings
(
    landing_id   serial primary key,
    spaceship_id integer references spaceship on delete cascade not null,
    planet_id    integer                                        references planet on delete set null,
    spacebase_id integer                                        references spacebase on delete set null,
    check (not (planet_id is not null and spacebase_id is not null))
);