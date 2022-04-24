//Entfernt 0_userdata.0. aus der directory, falls sie fälschlicherweise mit angegeben wurde
if (directory.indexOf('0_userdata.0.' ) + 1 > 0) directory = directory.replace('0_userdata.0.', '');

settingsDirectory = '0_userdata.0.' + directory + '.0_Settings.' + Group_ID;
groupDirectory = '0_userdata.0.' + directory + '.1_Groups.' + Group_ID;
selectorDirectory = 'state[id=*](dynamic_lightscenes=' + Group_ID + ')';

//legt Datenpunkt für minimale Duration an, falls er nicht existiert
//sonst werden Standardwerte hinzugefügt
createState(settingsDirectory + '.Duration.duration_min', 0, true, {
  'name': 'min duration',
  'read': true,
  'write': true,
  'type': 'number'
  }, function(err){
        if (!err) console.log("Der Datenpunkt für die minimale Dauer des Farbwechsels wurde angelegt.");
        else console.log("Der Datenpunkt für die minimale Dauer konnte nicht erstellt werden: " + err);

        //legt Datenpunkt für maximale Duration an, falls er nicht existiert
        //sonst werden Standardwerte hinzugefügt
        createState(settingsDirectory + '.Duration.duration_max', 0, true, {
          'name': 'max duration',
          'read': true,
          'write': true,
          'type': 'number'
          }, function(err){
                if (!err) console.log("Der Datenpunkt für die maximale Dauer des Farbwechsels wurde angelegt.");
                else console.log("Der Datenpunkt für die maximale Dauer konnte nicht erstellt werden: " + err);

                //legt Datenpunkt für minimale Brightness an, falls er nicht existiert
                //sonst werden Standardwerte hinzugefügt
                createState(settingsDirectory + '.Brightness.brightness_min', 0, true, {
                    'name': 'min brightness',
                    'read': true,
                    'write': true,
                    'type': 'number'
                  }, function(err){
                        if (!err) console.log("Der Datenpunkt für die minimale Helligkeit der Lampengruppe wurde angelegt.");
                        else console.log("Der Datenpunkt für die minimale Helligkeit konnte nicht erstellt werden: " + err);

                        //legt Datenpunkt für maximale Brightness an, falls er nicht existiert
                        //sonst werden Standardwerte hinzugefügt
                        createState(settingsDirectory + '.Brightness.brightness_max', 0, true, {
                            'name': 'max brightness',
                            'read': true,
                            'write': true,
                            'type': 'number'
                          }, function(err){
                                if (!err) console.log("Der Datenpunkt für die maximale Helligkeit der Lampengruppe wurde angelegt.");
                                else console.log("Der Datenpunkt für die maximale Helligkeit konnte nicht erstellt werden: " + err);

                                //löscht, falls vorhanden, Backupordner
                                deleteObject(settingsDirectory + '.Backup', {recursive:true}, function(err){
                                  if (!err) console.log("Der Backupordner wurde erfolgreich gelöscht.");
                                  else console.log("Der Backupordner konnte nicht gelöscht werden: " + err);

                                  //löscht, falls vorhanden, Changeordner
                                  deleteObject(settingsDirectory + '.Change', {recursive:true}, function(err){
                                    if (!err) console.log("Der Changeordner wurde erfolgreich gelöscht.");
                                    else console.log("Der Changeordner konnte nicht gelöscht werden: " + err);

                                    //löscht, falls vorhanden, Commandsordner
                                    deleteObject(settingsDirectory + '.Commands', {recursive:true}, function(err){
                                      if(!err) console.log("Der Commandsordner wurde erfolgreich gelöscht.");
                                      else console.log("Der Commandsordner konnte nicht gelöscht werden: " + err);

                                      //erstellen Backup-, Change- & Commanddatenpunkt
                                      //für jedes Device aus der Gruppe
                                      var device_list2 = Array.prototype.slice.apply($(selectorDirectory));
                                      for (var device_index2 in device_list2) {
                                        device = device_list2[device_index2];
                                        deviceName = device.split('.').slice(-2)[0];

                                        //erstellt einen Backupdatenpunkt für jede Lampe der Gruppe
                                        createState(settingsDirectory + '.Backup.backup_' + deviceName, "", true, {
                                            'name': 'backup ' + deviceName,
                                            'read': true,
                                            'write': true,
                                            'type': 'json'
                                          }, function(err){
                                                if (!err) console.log("Der Backupdatenpunkt für die Lampe " + deviceName + " wurde angelegt.");
                                                else console.log("Der Backupatenpunkt für die Lampe " + deviceName + " konnte nicht erstellt werden: " + err);

                                                //erstellt einen Changedatenpunkt für jede Lampe der Gruppe
                                                createState(settingsDirectory + '.Change.change_' + deviceName, 'false', true, {
                                                    'name': 'change ' + deviceName,
                                                    'read': true,
                                                    'write': true,
                                                    'type': 'boolean',
                                                  }, function(err){
                                                        if (!err) console.log("Der Changedatenpunkt für die Lampe " + deviceName + " wurde angelegt.");
                                                        else console.log("Der Changedatenpunkt für die Lampe " + deviceName + " konnte nicht erstellt werden: " + err);

                                                        //erstellt einen Commanddatenpunkt für jede Lampe der Gruppe
                                                        createState(settingsDirectory + '.Commands.command_' + deviceName, "", true, {
                                                            'name': 'command ' + deviceName,
                                                            'read': true,
                                                            'write': true,
                                                            'type': 'json'
                                                          }, function(err){
                                                                if (!err) console.log("Der Commanddatenpunkt für die Lampe " + deviceName + " wurde angelegt.");
                                                                else console.log("Der COmmanddatenpunkt für die Lampe " + deviceName + " konnte nicht erstellt werden: " + err);
                                                        });
                                                });
                                        });
                                      }
                                    });
                                  });
                                });
                        });
                });
        });
});




if (update_Scenes) {
  await create_states_for_json();
}
await create_states_for_settings();
