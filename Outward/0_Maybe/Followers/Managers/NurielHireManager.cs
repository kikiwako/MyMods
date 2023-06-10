﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using UnityEngine;
using UnityEngine.UI;
using NodeCanvas.DialogueTrees;
using NodeCanvas.Framework;
using NodeCanvas.Tasks.Actions;
using SideLoader;

namespace Followers
{
    public static class NurielHireManager
    {
        // This class is just used for setting up the Trainer NPC. The Skill Tree is set up by the SkillManager.

        internal static SL_Character trainerTemplate;

        public static void Init()
        {
            var pack = SL.GetSLPack("wistipouf Followers");

            trainerTemplate = pack.CharacterTemplates["com.wistipouf.nuriel.hire"];

            trainerTemplate.OnSpawn += LocalTrainerSetup;
        }

        public static void LocalTrainerSetup(Character trainer, string _)
        {
            // remove unwanted components
            GameObject.DestroyImmediate(trainer.GetComponent<CharacterStats>());
            GameObject.DestroyImmediate(trainer.GetComponent<StartingEquipment>());

            // =========== setup Trainer DialogueTree from the template ===========

            //var trainertemplate = GameObject.Instantiate(Resources.Load<GameObject>("editor/templates/TrainerTemplate"));
            //trainertemplate.transform.parent = trainer.transform;
            //trainertemplate.transform.position = trainer.transform.position;

            // set Dialogue Actor name
            var necroActor = trainer.GetComponentInChildren<DialogueActor>();
            necroActor.SetName(trainerTemplate.Name);

            // get "Trainer" component, and set the SkillTreeUID to our custom tree UID
            var trainerComp = trainer.GetComponentInChildren<Trainer>();
            At.SetField(trainerComp, "m_skillTreeUID", new UID("com.sinai.necromancer"));

            // setup dialogue tree
            var graphController = trainer.GetComponentInChildren<DialogueTreeController>();
            var graph = graphController.graph;

            // the template comes with an empty ActorParameter, we can use that for our NPC actor.
            var actors = At.GetField(graph as DialogueTree, "_actorParameters") as List<DialogueTree.ActorParameter>;
            actors[0].actor = necroActor;
            actors[0].name = necroActor.name;

            // setup the actual dialogue now
            var rootStatement = graph.AddNode<StatementNodeExt>();
            rootStatement.statement = new Statement("Do you seek to harness the power of Corruption, traveler?");
            rootStatement.SetActorName(necroActor.name);

            var multiChoice1 = graph.AddNode<MultipleChoiceNodeExt>();
            multiChoice1.availableChoices.Add(new MultipleChoiceNodeExt.Choice { statement = new Statement { text = "I'm interested, what can you teach me?" } });
            multiChoice1.availableChoices.Add(new MultipleChoiceNodeExt.Choice { statement = new Statement { text = "Who are you?" } });
            multiChoice1.availableChoices.Add(new MultipleChoiceNodeExt.Choice { statement = new Statement { text = "What is this place?" } });

            // the template already has an action node for opening the Train menu. 
            // Let's grab that and change the trainer to our custom Trainer component (setup above).
            var openTrainer = graph.allNodes[1] as ActionNode;
            (openTrainer.action as TrainDialogueAction).Trainer = new BBParameter<Trainer>(trainerComp);

            // create some custom dialogue
            var answer1 = graph.AddNode<StatementNodeExt>();
            answer1.statement = new Statement("I wish I could remember...");
            answer1.SetActorName(necroActor.name);

            var answer2 = graph.AddNode<StatementNodeExt>();
            answer2.statement = new Statement("This is the fortress of the Plague Doctor, a powerful Lich. I've learned a lot about Corruption within these walls.");
            answer2.SetActorName(necroActor.name);

            // ===== finalize nodes =====
            graph.allNodes.Clear();
            // add the nodes we want to use
            graph.allNodes.Add(rootStatement);
            graph.allNodes.Add(multiChoice1);
            graph.allNodes.Add(openTrainer);
            graph.allNodes.Add(answer1);
            graph.allNodes.Add(answer2);
            graph.primeNode = rootStatement;
            graph.ConnectNodes(rootStatement, multiChoice1);    // prime node triggers the multiple choice
            graph.ConnectNodes(multiChoice1, openTrainer, 0);   // choice1: open trainer
            graph.ConnectNodes(multiChoice1, answer1, 1);       // choice2: answer1
            graph.ConnectNodes(answer1, rootStatement);         // - choice2 goes back to root node
            graph.ConnectNodes(multiChoice1, answer2, 2);       // choice3: answer2
            graph.ConnectNodes(answer2, rootStatement);         // - choice3 goes back to root node

            // set the trainer active
            trainer.gameObject.SetActive(true);
        }
    }
}