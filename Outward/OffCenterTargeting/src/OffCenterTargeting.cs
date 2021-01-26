using System;
using System.Reflection;
using System.Collections;

using BepInEx;
using UnityEngine;
using HarmonyLib;
using SharedModConfig;
using System.Collections.Generic;

namespace OffCenterTargeting
{
    [BepInPlugin(ID, NAME, VERSION)]
    [BepInDependency("com.sinai.SharedModConfig", BepInDependency.DependencyFlags.HardDependency)]
    public class OffCenterTargeting : BaseUnityPlugin
    {
        const string ID = "com.wistpouf.offCenterTargeting";
        const string NAME = "Off-Center Targeting";
        const string VERSION = "2.0";

        public static OffCenterTargeting Instance;
        public ModConfig offCenterConfig;

        internal void Start()
        {
            Instance = this;

            var harmony = new Harmony(ID);
            harmony.PatchAll();

            offCenterConfig = SetupConfig();
            offCenterConfig.Register();
        }

        private ModConfig SetupConfig()
        {

            var config = new ModConfig
            {
                ModName = "Off Center Targeting",
                SettingsVersion = 1.0,
                Settings = new List<BBSetting>()
                {
                    new FloatSetting
                    {
                        Name = "OffCenterAmount",
                        Description = "Off Center Amount",
                        DefaultValue = .6f,
                        MaxValue = 1f,
                        MinValue = 0f,
                        RoundTo = 1,
                        ShowPercent = false
                    }
}
            };
            return config;
        }

        [HarmonyPatch(typeof(CharacterCamera), "Update")]
        public class CharacterCamera_Update
        {
            [HarmonyPostfix]
            public static void Postfix(
                CharacterCamera __instance,
                Transform ___m_cameraVertHolder
                )
            {
                var self = __instance;

                float targetAngle = -90;
                float rotationAmount = (float)Instance.offCenterConfig.GetValue("OffCenterAmount");

                Vector3 targetPosition = new Vector3(
                    self.LookAtTransform.transform.position.x,
                    self.LookAtTransform.transform.position.y,
                    self.LookAtTransform.transform.position.z
                    );
                Vector3 playerPosition = new Vector3(
                    self.TargetCharacter.transform.position.x,
                    self.TargetCharacter.transform.position.y,
                    self.TargetCharacter.transform.position.z
                    );

                if (self.LookAtTransform != null || self.OverrideTransform != null)
                {
                    Vector3 targetDirection = targetPosition - playerPosition;
                    float angle = Vector3.Angle(targetDirection, self.TargetCharacter.transform.forward);

                    if (angle < targetAngle)
                    {
                        ___m_cameraVertHolder.Rotate(-rotationAmount, 0f, 0f);
                    }
                    else if (angle > targetAngle)
                    {
                        ___m_cameraVertHolder.Rotate(rotationAmount, 0f, 0f);
                    }
                }
            }
        }
    }
}