using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using BepInEx;
using UnityEngine;
using HarmonyLib;
using BepInEx.Configuration;

namespace Firearms
{
    [BepInPlugin(ID, NAME, VERSION)]
    public class Class1
    {
        const string ID = "com.wistpouf.firearms";
        const string NAME = "Firearms";
        const string VERSION = "0.01";

        public static Class1 Instance;

        internal void Start()
        {
            Instance = this;

            var harmony = new Harmony(ID);
            harmony.PatchAll();



            //ModConfig.Init(Config);
        }
    }

    //public static class ModConfig
    //{
    //    public static ConfigEntry<float> someSetting;

    //    public static void Init(ConfigFile config)
    //    {
    //        someSetting = config.Bind(
    //            "OffCenter",
    //            "Off-Center Amount",
    //            .6f,
    //            new ConfigDescription(
    //                "Sets how high in the screen the target is.",
    //                new AcceptableValueRange<float>(0f, 100f)
    //            )
    //        );
    //    }
    //}
}
