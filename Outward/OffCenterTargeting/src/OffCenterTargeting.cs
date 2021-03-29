using System;
using System.Reflection;
using System.Collections;

using BepInEx;
using UnityEngine;
using HarmonyLib;
using SharedModConfig;
using System.Collections.Generic;
using BepInEx.Configuration;

namespace OffCenterTargeting
{
    [BepInPlugin(ID, NAME, VERSION)]
    public class OffCenterTargeting : BaseUnityPlugin
    {
        const string ID = "com.wistpouf.offCenterTargeting";
        const string NAME = "Off-Center Targeting";
        const string VERSION = "2.0";

        public static OffCenterTargeting Instance;

        internal void Start()
        {
            Instance = this;

            var harmony = new Harmony(ID);
            harmony.PatchAll();

            ModConfig.Init(Config);
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
                float rotationAmount = ModConfig.offCenterAmount.Value;

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

    public static class ModConfig
    {
        public static ConfigEntry<float> offCenterAmount;

        public static void Init(ConfigFile config)
        {
            offCenterAmount = config.Bind(
                "OffCenter",
                "Off-Center Amount",
                .6f,
                new ConfigDescription(
                    "Sets how high in the screen the target is.",
                    new AcceptableValueRange<float>(0f, 1f)
                )
            );
        }
    }
}