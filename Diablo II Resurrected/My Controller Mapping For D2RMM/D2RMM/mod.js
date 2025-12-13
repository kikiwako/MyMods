

const controllerSettingsFilename = "hd\\global\\excel\\controllersettings.json";
const controllerSettingsHD = D2RMM.readJson(controllerSettingsFilename);

controllerSettingsHD.config.defaultClassButtonMapping.forEach((characterMappings) => {
  if (characterMappings[0].name.startsWith("Amazon")) {
    characterMappings.forEach((mapping) => {
      if (mapping.name === 'Amazon_buttonMapping_Attack') mapping.button = 5;
      if (mapping.name === 'Amazon_buttonMapping_2') mapping.button = 4;
    });
  }

  if (characterMappings[0].name.startsWith("Sorceress")) {
    characterMappings.forEach((mapping) => {
      if (mapping.name === 'Sorceress_buttonMapping_Attack') mapping.button = 5;
    });

    characterMappings.push({
      type: "ControllerDefaultButtonMap",
      name: "Sorceress_buttonMapping_3",
      button: 4,
      skill: 2
    })
  }

  if (characterMappings[0].name.startsWith("Necromancer")) {
    characterMappings.forEach((mapping) => {
      if (mapping.name === 'Necromancer_buttonMapping_Attack') mapping.button = 5;
    });

    characterMappings.push({
      type: "ControllerDefaultButtonMap",
      name: "Necromancer_buttonMapping_3",
      button: 4,
      skill: 2
    })
  }

  if (characterMappings[0].name.startsWith("Paladin")) {
    characterMappings.forEach((mapping) => {
      if (mapping.name === 'Paladin_buttonMapping_Attack') mapping.button = 5;
    });

    characterMappings.push({
      type: "ControllerDefaultButtonMap",
      name: "Paladin_buttonMapping_2",
      button: 4,
      skill: 2
    })
  }

  if (characterMappings[0].name.startsWith("Barbarian")) {
    characterMappings.forEach((mapping) => {
      if (mapping.name === 'Barbarian_buttonMapping_Attack') mapping.button = 5;
    });

    characterMappings.push({
      type: "ControllerDefaultButtonMap",
      name: "Barbarian_buttonMapping_2",
      button: 4,
      skill: 2
    })
  }

  if (characterMappings[0].name.startsWith("Druid")) {
    characterMappings.forEach((mapping) => {
      if (mapping.name === 'Druid_buttonMapping_Attack') mapping.button = 5;
    });

    characterMappings.push({
      type: "ControllerDefaultButtonMap",
      name: "Druid_buttonMapping_2",
      button: 4,
      skill: 2
    })
  }

  if (characterMappings[0].name.startsWith("Assassin")) {
    characterMappings.forEach((mapping) => {
      if (mapping.name === 'Assassin_buttonMapping_0') mapping.button = 5;
    });

    characterMappings.push({
      type: "ControllerDefaultButtonMap",
      name: "Assassin_buttonMapping_2",
      button: 4,
      skill: 2
    })
  }
});
D2RMM.writeJson(controllerSettingsFilename, controllerSettingsHD);

D2RMM.copyFile(
  'hd', // <mod folder>\hd
  'hd', // <diablo 2 folder>\mods\<modname>\<modname>.mpq\data\hd
  true // overwrite any conflicts
);