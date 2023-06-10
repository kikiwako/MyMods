using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using BepInEx;
using UnityEngine;
using HarmonyLib;
using BepInEx.Configuration;
using SideLoader;

namespace Followers
{
    [BepInPlugin(ID, NAME, VERSION)]
    [BepInDependency(SL.GUID, BepInDependency.DependencyFlags.HardDependency)]
    public class Followers : BaseUnityPlugin
    {
        public static Followers Instance;
        public const string ID = "com.wistpouf.followers";
        public const string NAME = "Followers";
        public const string VERSION = "0.1";

        internal void Awake()
        {
            SL.OnPacksLoaded += SL_OnPackLoaded;

            var harmony = new Harmony(ID);
            harmony.PatchAll();

            ModConfig.Init(Config);
        }

        private void SL_OnPackLoaded()
        {
            NurielHireManager.Init();
        }
    }

    public static class ModConfig
    {
        public static ConfigEntry<bool> nuriel;

        public static void Init(ConfigFile config)
        {
            nuriel = config.Bind(
                "Followers",
                "Spawn Nuriel",
                true,
                "Toggles Nuriel's existence (Yes... You have this power... You are a god...)"
            );
        }
    }
}
