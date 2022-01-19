-- triggers and functions

-- Updates a pilot's karma by it's id
create or replace function update_karma() returns trigger as
$$
begin
    update pilot
    set rating =
            (
                    (
                        select rating
                        from pilot
                        where id = new.pilot_id
                    )
                    +
                    (
                        select action_impact
                        from (
                                 select *
                                 from action
                                 where pilot_id = new.pilot_id
                             ) as a
                                 join
                             action_type as a_t
                             on a.action_type_id = a_t.id
                    )
                )
    where id = NEW.id;
    return new;
end;
$$ language plpgsql;


create trigger update_karma_trigger
    after insert
    on action
    for each row
execute procedure update_karma();



-- new triggers


create or replace function tr_fn_Living_races_insert() returns trigger as
$$
declare
    citizens int;
begin
    citizens = (select citizens from planet where planet_id = NEW.planet_id);
    if ( citizens = 0 ) then
        raise exception 'A planet with no citizens can not have any living races.';
    end if;

    return NEW;
end;
$$ language plpgsql;


create trigger tr_Living_races_insert
    before insert
    on living_races
    for each row
execute procedure tr_fn_Living_races_insert();



create or replace function tr_fn_Pilot_insert() returns trigger as
$$
begin
    NEW.rating = 0;

    return new;
end;
$$ language plpgsql;


create trigger tr_Pilot_insert
    before update
    on pilot
    for each row
execute procedure tr_fn_Pilot_insert();



create or replace function tr_fn_Pilot_update() returns trigger as
$$
declare
    old_rating int;
begin
    old_rating = (select rating from pilot where id = NEW.id);

    if ( NEW.rating is not null ) then
        NEW.rating = old_rating;
    end if;

    return NEW;
end;
$$ language plpgsql;


create trigger tr_Pilot_update
    before update
    on pilot
    for each row
execute procedure tr_fn_Pilot_update();