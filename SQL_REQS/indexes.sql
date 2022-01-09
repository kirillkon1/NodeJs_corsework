create index pilot_index on pilot using hash(id);

create index spaceship_index_system on spaceship using btree(system_id);
create index spaceship_index on spaceship using hash(pilot_id);

create index action_index on action using btree(pilot_id);

create index username_index on username using hash(login);

create index planet_index_system on planet using btree(system_id);

create index living_races_index on living_races using btree(planet_id);

create index landings_index on landings using btree(planet_id);
create index landings_index_2 on landings using btree(spacebase_id);
