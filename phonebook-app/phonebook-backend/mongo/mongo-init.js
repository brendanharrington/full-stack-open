db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('persons');

db.persons.insert({ name: 'Person 0', number: '000-000-0000' });
db.persons.insert({ name: 'Person 1', number: '111-111-1111' });
db.persons.insert({ name: 'Person 2', number: '222-222-2222' });
