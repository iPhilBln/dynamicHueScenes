if (directory.indexOf('0_userdata.0.' ) + 1 > 0) directory = directory.replace('0_userdata.0.', '');

if (!existsState('0_userdata.0.' + directory + '.0_Settings.' + Group_ID + '.Duration.duration_min')){
  createState('0_userdata.0.' + directory + '.0_Settings.' + Group_ID + '.Duration.duration_min', 0, {
    'name': 'min duration',
    'read': true,
    'write': true,
    'type': 'number'
  });
  console.log("Der Datenpunkt für die minimale Dauer des Farbwechsels wurde angelegt.");
}

if ( !existsState('0_userdata.0.' + directory + '.0_Settings.' + Group_ID + '.Duration.duration_max')){
  createState('0_userdata.0.' + directory + '.0_Settings.' + Group_ID + '.Duration.duration_max', 0, {
    'name': 'max duration',
    'read': true,
    'write': true,
    'type': 'number'
  });
  console.log("Der Datenpunkt für die maximale Dauer des Farbwechsels wurde angelegt.");
}

if (!existsState('0_userdata.0.' + directory + '.0_Settings.' + Group_ID + '.Brightness.brightness_min')){
  createState('0_userdata.0.' + directory + '.0_Settings.' + Group_ID + '.Brightness.brightness_min', 0, {
      'name': 'min brightness',
      'read': true,
      'write': true,
      'type': 'number'
  });
  console.log("Der Datenpunkt für die minimale Helligkeit der Lampengruppe wurde angelegt.");
}

if (!existsState('0_userdata.0.' + directory + '.0_Settings.' + Group_ID + '.Brightness.brightness_max')){
  createState('0_userdata.0.' + directory + '.0_Settings.' + Group_ID + '.Brightness.brightness_max', 0, {
      'name': 'max brightness',
      'read': true,
      'write': true,
      'type': 'number'
  });
  console.log("Der Datenpunkt für die maximale Helligkeit der Lampengruppe wurde angelegt.");
}










if (update_json) {
  await create_states_for_json();
}
await create_states_for_settings();
