/*
${data_cps}

${data_kill_cp}
${data_kill_pos}
${data_kill_rad}

${data_orb_cp}
${data_orb_pos}
${data_orb_strength}
${data_orb_ult}
${data_orb_dash}
${data_orb_lock}

${ulteanbled}
${ultarray}
${dasheanbled}
${dasharray}
*/

function setdata(){
    data_pasta = `
settings
{
	main
	{
		Description: "~ The Official Genji Parkour Editor ~\nCode: 54CRY\nAdapted by: nebula#11571/FishoFire#2431\n Makeshift copied template"
		Mode Name: "Genji Parkour v1.0.4.2 - manual"
	}

	lobby
	{
		Allow Players Who Are In Queue: Yes
		Match Voice Chat: Enabled
		Max Spectators: 3
		Max Team 1 Players: 11
		Max Team 2 Players: 0
		Return To Lobby: Never
		Swap Teams After Match: No
	}

	modes
	{
		Skirmish

		Team Deathmatch
		{
			Game Length In Minutes: 15
			Mercy Resurrect Counteracts Kills: Off
			Self Initiated Respawn: Off
		}

		General
		{
			Allow Hero Switching: Off
			Enemy Health Bars: Off
			Game Mode Start: Immediately
			Hero Limit: Off
			Kill Cam: Off
			Kill Feed: Off
			Respawn As Random Hero: On
			Respawn Time Scalar: 0%
			Spawn Health Packs: Disabled
		}
	}

	heroes
	{
		General
		{
			Genji
			{
				Deflect: Off
				No Ammunition Requirement: On
				Spawn With Ultimate Ready: On
				Swift Strike Cooldown Time: 0%
				Ultimate Duration: 25%
				Ultimate Generation - Passive Dragonblade: 500%
				Ultimate Generation Dragonblade: 500%
			}

			enabled heroes
			{
				Genji
			}
		}
	}

	extensions
	{
		Play More Effects
	}
}

variables
{
	global:
		0: A
		1: B
		2: C
		4: TimeRemaining
		7: H
		8: I
		9: J
		10: K
		11: L
		12: Dao
		13: SHIFT
		15: P
		18: TQ
		19: TQ1
		20: TQ2
		21: TQ3
		22: EditMode
		23: TQ5
		24: TQ6
		25: BounceToggleLock
		26: killballnumber
		27: pinballnumber
		28: deathjump
		30: save
		32: LeaderBoardFull
		35: kaxiaotiao
		38: NANBA
		39: DashExploitToggle
		40: PortalNames
		41: PortalLoc
		42: PortalDest
		43: PortalOn
		44: Difficultyhud
		45: CustomPortalStart
		46: CustomPortalEndpoint
		47: CustomPortalCP

	player:
		0: A
		1: B
		2: C
		3: D
		4: E
		5: F
		7: H
		9: J
		10: K
		11: LockState
		12: ztjs
		13: Temp
		14: O
		15: MovedCheckpoint
		16: PracticeCheckpoint
		17: PracticeToggle
		19: LeaderboardToggle
		26: TY
		28: paqiang
		31: quick_restart
		32: climbNum
		38: PreviewsArray
		39: PreviewsI
		40: invis
		41: flytoggle
		42: savemaphud
		43: TracesOff
		45: EditorOn
		46: LockCollected
		47: bouncetouched
		48: PortalLoop
		50: KillPosition_Cache
		51: KillRadii_Cache
		52: BouncePosition_Cache
		53: BounceStrength_Cache
		54: BounceUlt_Cache
		55: BounceDash_Cache
		56: BounceLock_Cache
		57: BounceIndex_Cache
		58: KillIndex_Cache
		60: EffectSizeArray
		61: EffectSizeToggle
		85: CH
}

subroutines
{
	0: Sub0
	1: Sub1
	2: Leaderboardupdate
	3: KILLBALL
	4: pinball
	5: BuildPortals
	6: RebuildBounceOrbs
	7: RebuildKillOrbs
	8: UpdateCache
	9: checkpointFailReset
}
disabled rule("------------------------------------------------------------------------ Map pasta ------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map Data     <---- INSERT YOUR MAP DATA HERE")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		
		"======= Checkpoint data =========================="
		"checkpoints positions - Vector(123.456,123.456,123.456) - The order is the checkpoint number.  The first Vector here is checkpoint 0"

		"======= killballs =========================="
		"killball level number - Number 123 - Number of the checkpoint (in position array starting count with 0)"
		Global.killballnumber = Array(
			1
		);
		
		"killball positions - Vector(123.456,123.456,123.456)"
		Global.H = Array(
			Vector(0,0,0)
		);
			
		"killball radius - Vector(123.456,123.456,123.456)"
		Global.I = Array(
			1
		);
		
				
		"======= orbs =========================="	
		"orb checkpoint number - Number 123 - Number of the checkpoint (in position array starting count with 0)"
		Global.pinballnumber = Array(
			1
		);
		
		"orb position - Vector(123.456,123.456,123.456)"
		Global.TQ = Array(
			Vector(0,0,0)
		);
		
		"orb bounce strength - Number 123.456 - default bounce is 10 - 0 means dont bounce"
		Global.EditMode = Array(
			10
		);
		
		"orb gives ult - True or False"
		Global.TQ5 = Array(
			False  
		);
		
		"orb gives dash - True or False"
		Global.TQ6 = Array(
			False
		);
		
		"orb locks checkpoint - True or False"
		Global.BounceToggleLock = Array(
			False
		);
		
		"======= others - DONT CHANGE =========================="	
		Global.TimeRemaining = 263;
		Global.LeaderBoardFull = Empty Array;
		Global.Difficultyhud = 2;

	}
}

rule("Credits here <---- INSERT YOUR NAME HERE")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Create HUD Text(All Players(All Teams), Null, Null, Custom String("made by: NAME HERE"), Left, -15, Null, Null, Color(Violet),
			Visible To, Default Visibility);
		Create HUD Text(All Players(All Teams), Null, Null, Custom String("map code: XXXXX"), Left, -14, Null, Null, Color(Sky Blue),
			Visible To, Default Visibility);
		Create HUD Text(All Players(All Teams), Null, Null, Custom String("Discord: dsc.gg/genjiparkour"), Left, -13, Null, Null, Color(
			Aqua), Visible To, Default Visibility);
	}
}

disabled rule("Custom difficulty hud")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"1) workshop settings > difficulty > set to \"dont display\"\r\n2) enable this rule\r\n3) type your difficulty in the hud below"
		Create HUD Text(All Players(All Teams), Null, Custom String("Difficulty: custom"), Null, Top, -24, Null, Color(Green), Null,
			Visible To, Default Visibility);
	}
}

disabled rule("Display World Record")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"1) enable this rule\r\n2) type your entry in the textfield that says \"name and time here\""
		Create HUD Text(Host Player.EditorOn ? Null : All Players(All Teams), Null, Custom String(" \n{0} world record {0}", Icon String(
			Fire)), Custom String("name and time here"), Right, -1, Color(Rose), Color(Rose), Color(Rose), Visible To, Default Visibility);
	}
}

rule("Friend Title <----  DISPLAY MESSAGE HERE (ON PLAYER)")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Has Spawned(Event Player) == True;
	}

	actions
	{
		"In the field custom string your nickname"
		If(Custom String("your nickname <-------") == Custom String("{0}", Event Player));
			Big Message(All Players(All Teams), Custom String("Message to the whole room"));
			Create In-World Text(All Players(All Teams), Custom String("Title <---------------The inscription that will be displayed on you"),
				Event Player, 1.500, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
		End;
		"Fill in the blank with your friend's name"
		If(Custom String("your nickname <-------") == Custom String("{0}", Event Player));
			Big Message(All Players(All Teams), Custom String("Message to the whole room"));
			Create In-World Text(All Players(All Teams), Custom String("Title <---------------The inscription that will be displayed on you"),
				Event Player, 1.500, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
	}
}

rule("SUB | Rebuild Bounce Orbs")
{
	event
	{
		Subroutine;
		RebuildBounceOrbs;
	}

	actions
	{
		Destroy Effect(Global.TQ2);
		Global.TQ2 = Empty Array;
		For Global Variable(NANBA, 0, Count Of(Global.pinballnumber), 1);
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.A == Global.pinballnumber[Evaluate Once(Global.NANBA)] && !Array Contains(
				Current Array Element.LockCollected, Evaluate Once(Global.TQ[Evaluate Once(Global.NANBA)]))), Orb,
				Global.BounceToggleLock[Evaluate Once(Global.NANBA)] ? Color(Orange) : Color(Green), Global.TQ[Evaluate Once(Global.NANBA)], 1,
				Visible To Position Radius and Color);
			Modify Global Variable(TQ2, Append To Array, Last Created Entity);
			Wait(0.016, Ignore Condition);
		End;
	}
}

rule("SUB | Rebuild Kill Orbs")
{
	event
	{
		Subroutine;
		RebuildKillOrbs;
	}

	actions
	{
		Destroy Effect(Global.K);
		Global.K = Empty Array;
		For Global Variable(NANBA, 0, Count Of(Global.killballnumber), 1);
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.A == Global.killballnumber[Evaluate Once(Global.NANBA)]), Sphere, Color(Blue), Global.H[Evaluate Once(
				Global.NANBA)], Global.I[Evaluate Once(Global.NANBA)], Visible To Position and Radius);
			Modify Global Variable(K, Append To Array, Last Created Entity);
			Wait(0.016, Ignore Condition);
		End;
	}
}

rule("SUB | Rebuild Portals")
{
	event
	{
		Subroutine;
		BuildPortals;
	}

	actions
	{
		"custom portals"
		If(Global.CustomPortalStart);
			For Global Variable(NANBA, 0, Count Of(Global.CustomPortalStart), 1);
				Create Effect(Filtered Array(All Players(All Teams), Current Array Element.A == Global.CustomPortalCP[Evaluate Once(Global.NANBA)
					] || Global.CustomPortalCP[Evaluate Once(Global.NANBA)] == 999), Good Aura, Color(White),
					Global.CustomPortalStart[Evaluate Once(Global.NANBA)], 0.600, Visible To);
				Wait(0.160, Ignore Condition);
			End;
		End;
		"pre-set portals"
		If(Global.PortalDest);
			For Global Variable(NANBA, 0, Count Of(Global.PortalLoc), 1);
				Create Effect(Filtered Array(All Players(All Teams), Current Array Element.C || Current Array Element.A == Count Of(Global.A) - 1),
					Bad Aura, Evaluate Once(Global.NANBA) % 2 == 1 ? Color(Aqua) : Color(Orange), Global.PortalLoc[Evaluate Once(Global.NANBA)],
					0.600, Visible To);
				Create In-World Text(Filtered Array(All Players(All Teams), Current Array Element.C || Current Array Element.A == Count Of(
					Global.A) - 1), Custom String("{0}", Global.PortalNames[Evaluate Once(Global.NANBA)]), Global.PortalLoc[Evaluate Once(
					Global.NANBA)] + Vector(0, 1, 0), 1, Clip Against Surfaces, Visible To, Color(White), Default Visibility);
			End;
		End;
	}
}

rule("SUB | Update Effect Cache")
{
	event
	{
		Subroutine;
		UpdateCache;
	}

	actions
	{
		Event Player.BouncePosition_Cache = Filtered Array(Global.TQ, Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.BounceStrength_Cache = Filtered Array(Global.EditMode, Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.BounceUlt_Cache = Filtered Array(Global.TQ5, Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.BounceDash_Cache = Filtered Array(Global.TQ6, Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.BounceLock_Cache = Filtered Array(Global.BounceToggleLock,
			Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.KillPosition_Cache = Filtered Array(Global.H, Global.killballnumber[Current Array Index] == Event Player.A);
		Event Player.KillRadii_Cache = Filtered Array(Global.I, Global.killballnumber[Current Array Index] == Event Player.A);
		Abort If(!Host Player.EditorOn);
		Destroy Effect(Event Player.EffectSizeArray);
		Event Player.EffectSizeArray = Empty Array;
		Create Effect(Event Player.EffectSizeToggle ? Event Player : Null, Sphere, Color(White), Global.A[Event Player.A], 1.400,
			Visible To Position and Radius);
		Modify Player Variable(Event Player, EffectSizeArray, Append To Array, Last Created Entity);
		Create Effect(Event Player.EffectSizeToggle && Event Player.A < Count Of(Global.A) - 1 ? Event Player : Null, Sphere, Color(White),
			Global.A[Event Player.A + 1], 1.400, Visible To Position and Radius);
		Modify Player Variable(Event Player, EffectSizeArray, Append To Array, Last Created Entity);
		Event Player.BounceIndex_Cache = Filtered Array(Mapped Array(Global.pinballnumber,
			Current Array Element == Event Player.A ? Current Array Index : -1), Current Array Element >= 0);
		Event Player.KillIndex_Cache = Filtered Array(Mapped Array(Global.killballnumber,
			Current Array Element == Event Player.A ? Current Array Index : -1), Current Array Element >= 0);
		If(Event Player.MovedCheckpoint && Event Player == Host Player);
			Global.B = Event Player.A;
			Global.J = Event Player.KillIndex_Cache ? 0 : 99999;
			Global.L = Count Of(Event Player.KillIndex_Cache) ? Global.H[Event Player.KillIndex_Cache[Global.J]] : Vector(0, 0, 0);
			Global.TQ1 = Event Player.BounceIndex_Cache ? 0 : 99999;
			Global.TQ3 = Count Of(Event Player.BounceIndex_Cache) ? Global.TQ[Event Player.BounceIndex_Cache[Global.TQ1]] : Vector(0, 0, 0);
			Event Player.MovedCheckpoint = False;
		End;
	}
}

disabled rule("------------------------------------------------------------------------  Editor ------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

rule("HUD | Clear Excess Data & Save Map")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Melee)) == True;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Reload)) == True;
		Event Player == Host Player;
	}

	actions
	{
		Wait(0.500, Abort When False);
		Global.B = 0;
		Global.C = 0;
		"Portal1PlayerList = 0\r\nPortal2PlayerList = 0"
		Global.J = 0;
		Global.K = 0;
		Global.L = 0;
		Global.Dao = 0;
		Global.SHIFT = 0;
		Global.P = 0;
		Global.TQ1 = 0;
		Global.NANBA = 0;
		Global.TQ2 = 0;
		Global.TQ3 = 0;
		Global.save = 0;
		Global.LeaderBoardFull = Empty Array;
		Global.PortalOn = False;
		"bigMessage(getAllPlayers(), \"Excess data has been cleared\")\r\nbigMessage(getAllPlayers(), \"Excess data has been cleared\")"
		Enable Inspector Recording;
		Create HUD Text(Event Player, Custom String(
			"　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   0. clear excess data:\n Automatically done when opening this window\n\n   1. Copy da{0}",
			Custom String(
			"ta:\n Open Workshop Inspector → Set variable target as global\n click the [x]\n\n   2. Insert data:\n Paste the data in the rul{0}",
			Custom String(
			"e named 'map data pasta' (first rule)\n\n   3. Workshop settings:\n ESC→SHOW LOBBY→SETTINGS→ workshop settings →\n toggle 'Edi{0}",
			Custom String("tor mode' off\n Select display difficulty\n")))), Null, Null, Top, -99, Color(Lime Green), Null, Null, None,
			Default Visibility);
		Event Player.savemaphud[0] = Last Text ID;
		Create HUD Text(Event Player, Custom String(
			"　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   4. Create initial sharecode:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n CREATE NEW COD{0}",
			Custom String(
			"E→COPY CODE\n\n   5. Add credits:\n Enter your name & map code in the 'Credits here' rule\n (second rule) \n\n   6. Update for c{0}",
			Custom String(
			"redits:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n UPLOAD TO EXISTING CODE→ PASTE THE CODE YOU CREATED IN STEP 4\n"))), Null,
			Null, Top, -98, Color(Lime Green), Null, Null, None, Default Visibility);
		Event Player.savemaphud[1] = Last Text ID;
		Create HUD Text(Event Player, Custom String("    > Press Interact to close this window <    "), Null, Null, Top, -97, Color(
			Lime Green), Null, Null, None, Default Visibility);
		Event Player.savemaphud[2] = Last Text ID;
		Wait Until(!Is Button Held(Event Player, Button(Interact)), 9999);
		Wait Until(Is Button Held(Event Player, Button(Interact)), 9999);
		Destroy HUD Text(First Of(Event Player.savemaphud));
		Destroy HUD Text(Event Player.savemaphud[1]);
		Destroy HUD Text(Event Player.savemaphud[2]);
	}
}

rule("HUD | Show/Hide Guide | Hold Melee")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Melee)) == True;
		Is Button Held(Event Player, Button(Interact)) == False;
		Is Button Held(Event Player, Button(Reload)) == False;
		Event Player == Host Player;
		Event Player.E >= 1;
	}

	actions
	{
		Wait(0.800, Abort When False);
		Abort If(Is Button Held(Event Player, Button(Interact)) || Is Button Held(Event Player, Button(Reload)));
		Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
		If(Event Player.K == 1);
			Event Player.K = 2;
			Small Message(Event Player, Custom String("Guide is hidden"));
		Else;
			Event Player.K = 1;
			Small Message(Event Player, Custom String("Guide is open"));
	}
}

rule("HUD | Show Guide On Spawn")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Has Spawned(Event Player) == True;
	}

	actions
	{
		Event Player.E = 1;
		Event Player.K = 1;
	}
}

rule("HUD | Guide")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"@Condition hostPlayer.EditorOn\r\n condition messes up if host player leaves"
		Wait Until(Has Spawned(Host Player), 90);
		Wait(0.500, Ignore Condition);
		Abort If(!Host Player.EditorOn);
		Create HUD Text(Host Player.K == 1 ? Host Player : Null, Null, Null, Custom String(" \n{0}", Array(Custom String(
			"{0} + {1} | Create New Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)),
			Custom String("{0} + {1} | Delete selected Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(
			Button(Secondary Fire)), Custom String("{0} + {1} | Add teleport to Checkpoint\n{2}", Input Binding String(Button(Interact)),
			Input Binding String(Button(Reload)), Custom String(
			"{0} + {1} | Set Checkpoint to current position\n{0} + {2} | Toggle Checkpoint Hitbox", Input Binding String(Button(Interact)),
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 1)))))), Custom String(
			"{0} + {1} | Create new kill orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)),
			Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(
			Secondary Fire)), Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)),
			Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Select next orb\n{2}", Input Binding String(Button(Interact)),
			Input Binding String(Button(Jump)), Custom String("{0} + {1} | Increase orb size\n{2}", Input Binding String(Button(
			Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb size\n{2}", Input Binding String(
			Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String(
			"{0} + {1} | Move orb forward\n{0} + {2} | Move orb Backward", Input Binding String(Button(Ability 2)), Input Binding String(
			Button(Primary Fire)), Input Binding String(Button(Secondary Fire))))))))), Custom String(
			"{0} + {1} | Create new Bounce orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)),
			Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(
			Secondary Fire)), Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)),
			Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Select next orb\n{2}", Input Binding String(Button(Interact)),
			Input Binding String(Button(Jump)), Custom String("{0} + {1} | Increase orb strength\n{2}", Input Binding String(Button(
			Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb strength\n{2}", Input Binding String(
			Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String(
			"{0} + {1} | Move orb forward\n{0} + {2} | Move orb back", Input Binding String(Button(Ability 2)), Input Binding String(
			Button(Primary Fire)), Input Binding String(Button(Secondary Fire))))))))))[Host Player.E - 1]), Right, 10, Null, Null, Color(
			Yellow), Visible To and String, Default Visibility);
		Create HUD Text(Host Player, Null, Null, Host Player.K == 1 ? Custom String(" \n{0} + {1} | Next checkpoint\n{2}",
			Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)), Custom String(
			"{0} + {1} | Prev checkpoint\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)),
			Custom String("{0} | Fly (checkpoint mode only)\nHold {1} | toggle guide\n", Input Binding String(Button(Ability 2)),
			Input Binding String(Button(Melee))))) : Custom String("Hold {0} | toggle guide", Input Binding String(Button(Melee))), Right,
			11, Null, Null, Host Player.K == 1 ? Color(Green) : Color(Orange), Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.K == 1 ? Host Player : Null, Null, Null, Custom String(
			"save map: hold {0} + {1} + {2} and follow instructions", Input Binding String(Button(Interact)), Input Binding String(Button(
			Melee)), Input Binding String(Button(Reload))), Left, -12, Null, Null, Color(Yellow), Visible To and String,
			Default Visibility);
		Create HUD Text(All Players(All Teams), Local Player == Host Player ? Custom String("Current mode: {0}", Array(Custom String(
			"Checkpoints"), Custom String("Kill Orb"), Custom String("Bounce Orb"))[Host Player.E - 1]) : Custom String(
			"Current editor/host: {0}", Host Player), Null, Null, Right, -60, Color(Red), Color(Red), Color(Red), Visible To and String,
			Default Visibility);
		Create HUD Text(Host Player, Null, Null, Custom String("Hold {0} to change mode\n", Input Binding String(Button(Ability 1))),
			Right, -59, Color(Red), Color(Red), Color(Red), Visible To and String, Default Visibility);
		Create HUD Text(Host Player.E == 3 ? Host Player : Null, Null, Null, Custom String("{0} + {1} | orb give ultimate | {2}",
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Primary Fire)),
			Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Custom String("on") : Custom String("off")), Top, -18, Null, Null,
			Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Color(Green) : Color(Orange), Visible To String and Color,
			Default Visibility);
		Create HUD Text(Host Player.E == 3 ? Host Player : Null, Null, Null, Custom String("{0} + {1} | orb gives dash | {2}",
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Secondary Fire)),
			Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Custom String("on") : Custom String("off")), Top, -17, Null, Null,
			Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Color(Green) : Color(Orange), Visible To String and Color,
			Default Visibility);
		Create HUD Text(Host Player.E == 3 ? Host Player : Null, Null, Null, Custom String("{0} + {1} | orb unlocks checkpoint | {2}\n",
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 2)),
			Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Custom String("on") : Custom String("off")), Top,
			-16, Null, Null, Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Color(Green) : Color(Orange),
			Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player, Custom String("{0}\norb/portal limit: {1}/{2}", Host Player.E == 1 ? Custom String("Checkpoint Mode")
			: (Host Player.E == 2 ? Custom String("Current Kill Orb's radius: {0}", Global.I[Host Player.KillIndex_Cache[Global.J]]) : (
			Host Player.E == 3 ? Custom String("Current Bounce Orb's strength: {0}",
			Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]]) : Custom String(""))), Count Of(Global.TQ) + Count Of(Global.H)
			+ Count Of(Global.CustomPortalStart), 193), Null, Null, Top, -20, Color(Red), Color(Orange), Color(Orange),
			Visible To and String, Default Visibility);
	}
}

rule("HUD | Guide Effects")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"@Condition hostPlayer.EditorOn"
		Wait Until(Has Spawned(Host Player), 90);
		Wait(0.500, Ignore Condition);
		Abort If(!Host Player.EditorOn);
		"##createEffect(getAllPlayers(), Effect.SPHERE, Color.RED, H[J], I[J], EffectReeval.VISIBILITY_POSITION_AND_RADIUS)\r\n Purple bounce selectino aura"
		Create Effect(Global.B != -1 && Host Player.BouncePosition_Cache ? All Players(All Teams) : Null, Good Aura, Color(Purple),
			Global.TQ3, 1, Visible To Position and Radius);
		"Don't open it easily, the action will be too long\r\n Selected kill orb text"
		Create In-World Text(Global.B != -1 && Host Player.KillPosition_Cache ? All Players(All Teams) : Null, Custom String(
			"Selected Kill Orb"), Global.H[Host Player.KillIndex_Cache[Global.J]], 1.600, Do Not Clip, Visible To Position and String,
			Color(Sky Blue), Default Visibility);
		"Red distance orb for kill orb"
		Create Effect(Global.B != -1 && Host Player.KillPosition_Cache ? All Players(All Teams) : Null, Orb, Color(Red), Global.L, 1,
			Visible To Position and Radius);
		"Distance # text for kill orb"
		Create In-World Text(Global.B != -1 && Host Player.KillPosition_Cache ? All Players(All Teams) : Null, String("{0} m",
			Distance Between(Host Player, Global.L)), Global.L - Vector(0, 1.500, 0), 1.500, Do Not Clip, Visible To Position and String,
			Color(Red), Default Visibility);
		"Selected kill orb arrow icon"
		Create Icon(Global.B != -1 && Host Player.KillPosition_Cache ? All Players(All Teams) : Null,
			Global.H[Host Player.KillIndex_Cache[Global.J]] + Vector(0, 0.600, 0), Arrow: Down, Visible To and Position, Color(Red), True);
		"Purple sphere for teleport location"
		Create Effect(Count Of(Global.A[Global.B]) > 1 ? All Players(All Teams) : Null, Sphere, Color(Purple),
			Global.A[Global.B][1] - Vector(0, 0.100, 0), 0.200, Visible To Position and Radius);
		"Teleport arrow icon"
		Create Icon(Count Of(Global.A[Global.B]) > 1 ? All Players(All Teams) : Null, Global.A[Global.B][1] + Vector(0, 0.600, 0),
			Arrow: Down, Visible To and Position, Color(Purple), True);
		"Teleport text"
		Create In-World Text(Count Of(Global.A[Global.B]) > 1 ? All Players(All Teams) : Null, Custom String("TELEPORTER EXIT"),
			Global.A[Global.B][1], 1.600, Do Not Clip, Visible To Position and String, Color(Sky Blue), Default Visibility);
	}
}

rule("Fly/Noclip Toggle | Hold Deflect")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		"@Condition eventPlayer.EditModeSelection > 0"
		Event Player.E == 1;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		"@Condition not eventPlayer.isHoldingButton(Button.JUMP)"
		Is Button Held(Event Player, Button(Crouch)) == False;
		"@Condition not eventPlayer.isHoldingButton(Button.PRIMARY_FIRE)\r\n@Condition not eventPlayer.isHoldingButton(Button.SECONDARY_FIRE)"
		Event Player.flytoggle == Null;
	}

	actions
	{
		Wait Until(!Is Button Held(Event Player, Button(Ability 2)) || (Is Button Held(Event Player, Button(Crouch)) && Is Button Held(
			Event Player, Button(Interact))), 1);
		If(Is Button Held(Event Player, Button(Crouch)) && Is Button Held(Event Player, Button(Interact)));
			Wait(0.016, Ignore Condition);
			Abort;
		End;
		Event Player.flytoggle = Position Of(Event Player) + Up;
		Start Forcing Player Position(Event Player, Event Player.flytoggle, True);
		Disable Movement Collision With Environment(Event Player, True);
		While(Is Alive(Event Player) && Event Player.flytoggle != Null && !Is Button Held(Event Player, Button(Ability 2)));
			Event Player.flytoggle += Facing Direction Of(Event Player) * (Z Component Of(Throttle Of(Event Player))
				> 0 ? 0.250 + Is Button Held(Event Player, Button(Jump)) : (Z Component Of(Throttle Of(Event Player))
				< 0 ? -0.250 - Is Button Held(Event Player, Button(Jump)) : 0));
			Event Player.flytoggle += World Vector Of(Vector(X Component Of(Throttle Of(Event Player)) * 0.300, 0, 0), Event Player, Rotation);
			Wait(0.016, Ignore Condition);
		End;
		Enable Movement Collision With Environment(Event Player);
		"if eventPlayer.flytoggle != null:"
		Event Player.flytoggle = Null;
		Stop Forcing Player Position(Event Player);
		Wait(1, Ignore Condition);
	}
}

rule("Change Edit Mode | Hold Dash")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Ability 1)) == True;
		Event Player == Host Player;
	}

	actions
	{
		Wait(1, Abort When False);
		Event Player.flytoggle = Null;
		If(Event Player.E == 1);
			Event Player.E = 2;
			Small Message(Host Player, Custom String("Current mode: Kill Orb"));
		Else If(Event Player.E == 2);
			Event Player.E = 3;
			Small Message(Host Player, Custom String("Current mode: Bounce Orb"));
		Else If(Event Player.E == 3);
			Event Player.E = 1;
			Small Message(Host Player, Custom String("Current mode: Checkpoint"));
	}
}

rule("Bounce Ball | Toggle Ultimate | Ultimate + Primary Fire")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Ultimate)) == True;
		Is Button Held(Event Player, Button(Primary Fire)) == True;
		Event Player == Host Player;
		Event Player.E == 3;
		Count Of(Global.TQ) != 0;
	}

	actions
	{
		"1 original"
		Wait(0.240, Ignore Condition);
		If(Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] == False);
			Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] = True;
		Else If(Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] == True);
			Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] = False;
		End;
		Call Subroutine(UpdateCache);
	}
}

rule("Bounce Ball | Toggle Dash | Ultimate + Secondary Fire")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Secondary Fire)) == True;
		Is Button Held(Event Player, Button(Ultimate)) == True;
		Event Player == Host Player;
		Event Player.E == 3;
		Count Of(Global.TQ) != 0;
	}

	actions
	{
		"1 original"
		Wait(0.240, Ignore Condition);
		If(Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] == False);
			Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] = True;
		Else If(Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] == True);
			Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] = False;
		End;
		Call Subroutine(UpdateCache);
	}
}

rule("Bounce Ball | Toggle Lock | Ultimate + deflect")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Is Button Held(Event Player, Button(Ultimate)) == True;
		Event Player == Host Player;
		Event Player.E == 3;
		Count Of(Global.TQ) != 0;
	}

	actions
	{
		"1 original"
		Wait(0.240, Ignore Condition);
		If(Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] == False);
			Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] = True;
			Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]] = 0;
		Else If(Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] == True);
			Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] = False;
			Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]] = 10;
		End;
		Call Subroutine(UpdateCache);
	}
}

rule("Bounce Ball | Increase Strength | Deflect + Jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Is Button Held(Event Player, Button(Jump)) == True;
		Event Player == Host Player;
		Event Player.E == 3;
	}

	actions
	{
		If(Count Of(Global.TQ) > 0);
			Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]] += 0.100;
			Wait(0.100, Ignore Condition);
			Loop If Condition Is True;
		End;
		Call Subroutine(UpdateCache);
	}
}

rule("Bounce Ball | Decrease Strength | Deflect + Crouch")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Is Button Held(Event Player, Button(Crouch)) == True;
		Event Player == Host Player;
		Event Player.E == 3;
		Is Button Held(Event Player, Button(Interact)) == False;
	}

	actions
	{
		If(Count Of(Global.TQ) > 0);
			Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]] -= 0.100;
			Wait(0.100, Ignore Condition);
			Loop If Condition Is True;
		End;
		Call Subroutine(UpdateCache);
	}
}

rule("Kill Orb | Increase Size | Deflect + Jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Is Button Held(Event Player, Button(Jump)) == True;
		Event Player == Host Player;
		Event Player.E > 1;
	}

	actions
	{
		If(Event Player.E == 2);
			If(Count Of(Global.H) > 0);
				Global.I[Host Player.KillIndex_Cache[Global.J]] += 0.100;
				Wait(0.100, Ignore Condition);
				Loop If Condition Is True;
			End;
		Else If(Event Player.E == 3);
			If(Count Of(Global.TQ) > 0);
				Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]] += 0.100;
				Wait(0.100, Ignore Condition);
				Loop If Condition Is True;
			End;
		End;
		Call Subroutine(UpdateCache);
	}
}

rule("Kill Orb | Decrease Size | Deflect + Crouch")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Is Button Held(Event Player, Button(Crouch)) == True;
		Event Player == Host Player;
		Event Player.E > 1;
		Is Button Held(Event Player, Button(Interact)) == False;
	}

	actions
	{
		If(Count Of(Global.H) > 0);
			If(Event Player.E == 2);
				Global.I[Host Player.KillIndex_Cache[Global.J]] -= 0.100;
				Wait(0.100, Ignore Condition);
				Loop If Condition Is True;
			End;
		End;
		Call Subroutine(UpdateCache);
	}
}

rule("Kill Orb / Bounce Orb | Move Toward/Backward | Deflect + Primary Fire")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire))) == True;
		Event Player == Host Player;
		Event Player.E > 1;
	}

	actions
	{
		If(Event Player.E == 2);
			If(Count Of(Global.H) == 0);
				Wait(0.016, Ignore Condition);
				Abort;
			End;
			While(Is Button Held(Event Player, Button(Ability 2)) && (Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(
				Event Player, Button(Secondary Fire))));
				Global.L += Facing Direction Of(Event Player) * (Is Button Held(Event Player, Button(Primary Fire)) ? 0.063 : -0.063);
				Wait(0.016, Ignore Condition);
			End;
			Global.H[Host Player.KillIndex_Cache[Global.J]] = Global.L;
		Else If(Event Player.E == 3);
			If(Count Of(Global.TQ) == 0);
				Wait(0.016, Ignore Condition);
				Abort;
			End;
			While(Is Button Held(Event Player, Button(Ability 2)) && (Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(
				Event Player, Button(Secondary Fire))));
				Global.TQ3 += Facing Direction Of(Event Player) * (Is Button Held(Event Player, Button(Primary Fire)) ? 0.063 : -0.063);
				Wait(0.016, Ignore Condition);
			End;
			Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]] = Global.TQ3;
		End;
		Call Subroutine(UpdateCache);
		Wait(0.016, Ignore Condition);
	}
}

rule("Checkpoint / Kill Orb / Bounce Orb | Create | Interact + Primary Fire")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Primary Fire)) == True;
		Event Player == Host Player;
	}

	actions
	{
		If(Event Player.E == 1);
			If(Global.B != -1 && Distance Between(Event Player, Global.A[Global.B]) <= 1.400);
				Small Message(Event Player, Custom String("Cannot place checkpoints too close."));
				Abort;
			End;
			If(Global.B == Count Of(Global.A) - 1);
				Modify Global Variable(A, Append To Array, Position Of(Event Player) - Vector(0, 0, 0));
				Global.B = Count Of(Global.A) - 1;
			Else;
				Modify Global Variable(A, Append To Array, Position Of(Event Player));
				Global.A = Mapped Array(Global.A, Current Array Index < Global.B + 1 ? Current Array Element : (
					Current Array Index == Global.B + 1 ? Last Of(Global.A) : Global.A[Current Array Index - 1]));
				Global.B += 1;
				Global.killballnumber = Mapped Array(Global.killballnumber, Current Array Element + (Current Array Element >= Global.B ? 1 : 0));
				Global.pinballnumber = Mapped Array(Global.pinballnumber, Current Array Element + (Current Array Element >= Global.B ? 1 : 0));
				Call Subroutine(UpdateCache);
				Call Subroutine(RebuildKillOrbs);
				Call Subroutine(RebuildBounceOrbs);
			End;
			Small Message(All Players(All Teams), Custom String("New Checkpoint has been created"));
		Else If(Event Player.E == 2);
			"if eventPlayer.CurrentCheckpoint == 0:\r\n     bigMessage(getAllPlayers(), \"Cannot place Kill Orb on first checkpoint\")\r\n else:"
			If(Count Of(Global.TQ) + Count Of(Global.H) + Count Of(Global.CustomPortalStart) >= 193);
				Big Message(All Players(All Teams), Custom String("Orb/portal limit reached for this map, delete old orbs first"));
				Wait(0.016, Ignore Condition);
				Abort;
			End;
			Modify Global Variable(H, Append To Array, Position Of(Event Player));
			Modify Global Variable(killballnumber, Append To Array, Event Player.A);
			Call Subroutine(UpdateCache);
			Global.J = Count Of(Host Player.KillIndex_Cache) - 1;
			Global.I[Host Player.KillIndex_Cache[Global.J]] = 5;
			"for TempIterator1 in range(len(KillBallPositions)):\r\n     destroyEffect(KillBallEffects[TempIterator1])\r\n KillBallEffects = []\r\n KILLBALL()"
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.A == Global.killballnumber[Evaluate Once(Host Player.KillIndex_Cache[Global.J])]), Sphere, Color(Blue),
				Global.H[Evaluate Once(Host Player.KillIndex_Cache[Global.J])], Global.I[Evaluate Once(Host Player.KillIndex_Cache[Global.J])],
				Visible To Position and Radius);
			Modify Global Variable(K, Append To Array, Last Created Entity);
			Call Subroutine(UpdateCache);
			Global.J = Count Of(Host Player.KillIndex_Cache) - 1;
			Global.L = Global.H[Host Player.KillIndex_Cache[Global.J]];
			Call Subroutine(RebuildKillOrbs);
			Big Message(All Players(All Teams), Custom String("New Kill Orb has been created! \r\nIt's only valid for checkpoint {0}",
				Event Player.A));
		Else If(Event Player.E == 3);
			"if eventPlayer.CurrentCheckpoint == 0:\r\n     bigMessage(getAllPlayers(), \"Cannot place bounce orb on first checkpoint\")\r\n else:"
			If(Count Of(Global.TQ) + Count Of(Global.H) + Count Of(Global.CustomPortalStart) >= 193);
				Big Message(All Players(All Teams), Custom String("Orb/portal limit reached for this map, delete old orbs first"));
				Wait(0.016, Ignore Condition);
				Abort;
			End;
			Modify Global Variable(TQ, Append To Array, Position Of(Event Player));
			Modify Global Variable(pinballnumber, Append To Array, Event Player.A);
			Call Subroutine(UpdateCache);
			Global.TQ1 = Count Of(Host Player.BounceIndex_Cache) - 1;
			Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]] = 10;
			Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] = False;
			Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] = False;
			Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] = False;
			"for TempIterator1 in range(len(BouncePositions)):\r\n     destroyEffect(BounceEffects[TempIterator1])\r\n BounceEffects = []\r\n pinball()"
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.A == Global.pinballnumber[Evaluate Once(Host Player.BounceIndex_Cache[Global.TQ1])] && !Array Contains(
				Current Array Element.LockCollected, Evaluate Once(Global.TQ[Evaluate Once(Host Player.BounceIndex_Cache[Global.TQ1])]))), Orb,
				Global.BounceToggleLock[Evaluate Once(Host Player.BounceIndex_Cache[Global.TQ1])] ? Color(Orange) : Color(Green),
				Global.TQ[Evaluate Once(Host Player.BounceIndex_Cache[Global.TQ1])], 1, Visible To Position Radius and Color);
			Modify Global Variable(TQ2, Append To Array, Last Created Entity);
			Call Subroutine(UpdateCache);
			Global.TQ1 = Count Of(Host Player.BounceIndex_Cache) - 1;
			Global.TQ3 = Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]];
			Call Subroutine(RebuildBounceOrbs);
			Big Message(All Players(All Teams), Custom String("New Bounce Orb has been created! \r\nIt's only valid for checkpoint {0}",
				Event Player.A));
		End;
		Wait(0.640, Ignore Condition);
	}
}

rule("Checkpoint / Kill Orb / Bounce Orb | Delete | Interact + Secondary Fire")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Secondary Fire)) == True;
		Event Player == Host Player;
	}

	actions
	{
		If(Event Player.E == 1);
			"Resync Kill Orbs"
			Event Player.Temp = Empty Array;
			Event Player.Temp = Filtered Array(Mapped Array(Global.killballnumber,
				Current Array Element == Global.B ? Current Array Index : -1), Current Array Element >= 0);
			"eventPlayer.Temp = [i for e, i in KillballCheckpoints if e == SelectedCheckpoint_Editing]"
			For Global Variable(NANBA, 0, Count Of(Event Player.Temp), 1);
				Destroy Effect(Global.K[Event Player.Temp[Global.NANBA]]);
				Modify Global Variable(K, Remove From Array By Index, Event Player.Temp[Global.NANBA]);
				Wait(0.016, Ignore Condition);
			End;
			"Remove specified checkpoint"
			Global.killballnumber = Remove From Array(Global.killballnumber, Global.B);
			"Decrement checkpoints after removed one"
			Global.killballnumber = Mapped Array(Global.killballnumber, Current Array Element - (Current Array Element > Global.B ? 1 : 0));
			"Remove Radii at Checkpoint indexes (temp)"
			Global.I = Filtered Array(Global.I, !Array Contains(Event Player.Temp, Current Array Index));
			Global.H = Filtered Array(Global.H, !Array Contains(Event Player.Temp, Current Array Index));
			Global.J = Count Of(Host Player.KillIndex_Cache) - 1;
			Global.L = Global.H[Host Player.KillIndex_Cache[Global.J]];
			Event Player.Temp = Empty Array;
			"Resync Bounce Orbs"
			Event Player.Temp = Filtered Array(Mapped Array(Global.pinballnumber,
				Current Array Element == Global.B ? Current Array Index : -1), Current Array Element >= 0);
			"eventPlayer.Temp = [i for e, i in BouncePadCheckpoints if e == SelectedCheckpoint_Editing]"
			For Global Variable(NANBA, 0, Count Of(Event Player.Temp), 1);
				Destroy Effect(Global.TQ2[Event Player.Temp[Global.NANBA]]);
				Modify Global Variable(TQ2, Remove From Array By Index, Event Player.Temp[Global.NANBA]);
				Wait(0.016, Ignore Condition);
			End;
			"Remove specified checkpoint"
			Global.pinballnumber = Remove From Array(Global.pinballnumber, Global.B);
			"Decrement checkpoints after removed one"
			Global.pinballnumber = Mapped Array(Global.pinballnumber, Current Array Element - (Current Array Element > Global.B ? 1 : 0));
			Global.TQ = Filtered Array(Global.TQ, !Array Contains(Event Player.Temp, Current Array Index));
			Global.EditMode = Filtered Array(Global.EditMode, !Array Contains(Event Player.Temp, Current Array Index));
			Global.TQ5 = Filtered Array(Global.TQ5, !Array Contains(Event Player.Temp, Current Array Index));
			Global.TQ6 = Filtered Array(Global.TQ6, !Array Contains(Event Player.Temp, Current Array Index));
			Global.BounceToggleLock = Filtered Array(Global.BounceToggleLock, !Array Contains(Event Player.Temp, Current Array Index));
			Global.TQ1 = Count Of(Host Player.BounceIndex_Cache) - 1;
			Global.TQ3 = Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]];
			Modify Global Variable(A, Remove From Array By Index, Global.B);
			Modify Global Variable(C, Remove From Array By Index, Global.B);
			If(Global.B <= 0);
				Global.B = -1;
				Skip(2);
			End;
			Global.B -= 1;
			Call Subroutine(RebuildKillOrbs);
			Call Subroutine(RebuildBounceOrbs);
			Small Message(All Players(All Teams), Custom String("Checkpoint has been deleted"));
		Else If(Event Player.E == 2 && Count Of(Global.H) != 0 && Host Player.KillPosition_Cache);
			Modify Global Variable(H, Remove From Array By Index, Host Player.KillIndex_Cache[Global.J]);
			Modify Global Variable(I, Remove From Array By Index, Host Player.KillIndex_Cache[Global.J]);
			Modify Global Variable(killballnumber, Remove From Array By Index, Host Player.KillIndex_Cache[Global.J]);
			Destroy Effect(Global.K[Host Player.KillIndex_Cache[Global.J]]);
			Modify Global Variable(K, Remove From Array By Index, Host Player.KillIndex_Cache[Global.J]);
			Skip If(Global.J <= 0, 1);
			Global.J -= 1;
			Call Subroutine(UpdateCache);
			Call Subroutine(RebuildKillOrbs);
			Global.L = Global.H[Host Player.KillIndex_Cache[Global.J]];
		Else If(Event Player.E == 3 && Count Of(Global.TQ) != 0 && Host Player.BouncePosition_Cache);
			Modify Global Variable(TQ, Remove From Array By Index, Host Player.BounceIndex_Cache[Global.TQ1]);
			Modify Global Variable(EditMode, Remove From Array By Index, Host Player.BounceIndex_Cache[Global.TQ1]);
			Modify Global Variable(TQ5, Remove From Array By Index, Host Player.BounceIndex_Cache[Global.TQ1]);
			Modify Global Variable(TQ6, Remove From Array By Index, Host Player.BounceIndex_Cache[Global.TQ1]);
			Modify Global Variable(BounceToggleLock, Remove From Array By Index, Host Player.BounceIndex_Cache[Global.TQ1]);
			Destroy Effect(Global.TQ2[Host Player.BounceIndex_Cache[Global.TQ1]]);
			Modify Global Variable(TQ2, Remove From Array By Index, Host Player.BounceIndex_Cache[Global.TQ1]);
			Modify Global Variable(pinballnumber, Remove From Array By Index, Host Player.BounceIndex_Cache[Global.TQ1]);
			Skip If(Global.TQ1 <= 0, 1);
			Global.TQ1 -= 1;
			Call Subroutine(UpdateCache);
			Call Subroutine(RebuildBounceOrbs);
			Global.TQ3 = Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]];
		End;
		Call Subroutine(UpdateCache);
	}
}

rule("Checkpoint | Move | Ultimate + Interact")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Ultimate)) == True;
		Is Button Held(Event Player, Button(Interact)) == True;
		Event Player == Host Player;
	}

	actions
	{
		Small Message(All Players(All Teams), Count Of(Global.A[Global.B]) != 0 ? Custom String("Checkpoint {0} has been deleted",
			Global.B) : Custom String(""));
		Global.A[Global.B] = Position Of(Event Player) - Vector(0, 0, 0);
		Small Message(All Players(All Teams), Custom String("Checkpoint has been moved to your position"));
	}
}

rule("Kill Orb / Bounce Orb | Select Previous | Interact + Crouch")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Crouch)) == True;
		Event Player == Host Player;
	}

	actions
	{
		If(Event Player.E == 2);
			"current = ( current - 1 ) % len(cache)"
			Global.J = (Global.J - 1) % Count Of(Event Player.KillIndex_Cache);
			Global.J = Global.J >= 0 ? Global.J : Count Of(Event Player.KillIndex_Cache) - 1;
			Global.L = Global.H[Host Player.KillIndex_Cache[Global.J]];
		Else If(Event Player.E == 3);
			Global.TQ1 = (Global.TQ1 - 1) % Count Of(Event Player.BounceIndex_Cache);
			Global.TQ1 = Global.TQ1 >= 0 ? Global.TQ1 : Count Of(Event Player.BounceIndex_Cache) - 1;
			Global.TQ3 = Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]];
	}
}

rule("Kill Orb / Bounce Orb | Select Next | Interact + Jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Jump)) == True;
		Event Player == Host Player;
	}

	actions
	{
		If(Event Player.E == 2);
			"current = ( current + 1 ) % len(cache)"
			Global.J = (Global.J + 1) % Count Of(Event Player.KillIndex_Cache);
			Global.L = Global.H[Host Player.KillIndex_Cache[Global.J]];
		Else If(Event Player.E == 3);
			Global.TQ1 = (Global.TQ1 + 1) % Count Of(Event Player.BounceIndex_Cache);
			Global.TQ3 = Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]];
	}
}

rule("Checkpoint | Toggle Checkpoint Sizes | Interact + Dash")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Ability 1)) == True;
		Event Player == Host Player;
	}

	actions
	{
		Event Player.EffectSizeToggle = !Event Player.EffectSizeToggle;
	}
}

rule("Checkpoint | Skip | Crouch + Primary/Secondary Fire")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.LockState == False;
		(Host Player.EditorOn || Event Player.PracticeToggle == 1) == True;
		Is Button Held(Event Player, Button(Crouch)) == True;
		((Is Button Held(Event Player, Button(Primary Fire)) && Event Player.A < Count Of(Global.A) - 1) || (Is Button Held(Event Player,
			Button(Secondary Fire)) && Event Player.A != 0)) == True;
	}

	actions
	{
		If(Is Button Held(Event Player, Button(Secondary Fire)));
			Abort If(Event Player.A == 0);
			Teleport(Event Player, Global.A[Event Player.A - 1]);
			Event Player.A -= 1;
			If(Event Player.PracticeToggle == 1);
				Event Player.PracticeCheckpoint -= 1;
			End;
		Else;
			Abort If(Event Player.A == Count Of(Global.A) - 1);
			Event Player.A += 1;
			If(Event Player.PracticeToggle == 1);
				Event Player.PracticeCheckpoint += 1;
			End;
			Teleport(Event Player, Global.A[Event Player.A]);
		End;
		Event Player.MovedCheckpoint = True;
		Call Subroutine(UpdateCache);
	}
}

rule("Teleport | Add | Interact + Rel﻿oad")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Host Player, Button(Melee)) == False;
		Is Button Held(Host Player, Button(Interact)) == True;
		Is Button Held(Host Player, Button(Reload)) == True;
		Count Of(Global.A) > 1;
		Host Player.E == 1;
		Global.B > 0;
	}

	actions
	{
		Wait Until(Is Button Held(Host Player, Button(Melee)) || !(Is Button Held(Host Player, Button(Interact)) && Is Button Held(
			Host Player, Button(Reload))), 0.500);
		Abort If(Is Button Held(Host Player, Button(Melee)) || (Is Button Held(Host Player, Button(Interact)) && Is Button Held(
			Host Player, Button(Reload))));
		Global.A[Global.B] = Array(Count Of(Global.A[Global.B]) != 0 ? First Of(Global.A[Global.B]) : Global.A[Global.B], Position Of(
			Host Player));
		Small Message(All Players(All Teams), Custom String("Teleport has been added for checkpoint {0}", Global.B));
	}
}

disabled rule("------------------------------------------------------------------------  General rules ------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Setup and Variables")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		If(True);
			Disable Inspector Recording;
		End;
		Disable Built-In Game Mode Respawning(All Players(All Teams));
		Disable Built-In Game Mode Completion;
		Disable Built-In Game Mode Scoring;
		Disable Built-In Game Mode Music;
		Disable Built-In Game Mode Announcer;
		"pauseMatchTime()"
		Start Forcing Spawn Room(All Teams, 0);
		Start Forcing Spawn Room(All Teams, 1);
		Start Forcing Spawn Room(All Teams, 2);
		Global.Dao = Count Of(Filtered Array(Global.Dao, Current Array Element != -1 && Current Array Element != Empty Array))
			&& Global.Dao != Null ? Global.Dao : Empty Array;
		Global.SHIFT = Count Of(Filtered Array(Global.SHIFT, Current Array Element != -1 && Current Array Element != Empty Array))
			&& Global.SHIFT != Null ? Global.SHIFT : Empty Array;
		Global.pinballnumber = Count Of(Global.pinballnumber) ? Global.pinballnumber : Empty Array;
		Global.A = Count Of(Global.A) ? Global.A : Empty Array;
		Global.A = Count Of(Global.A) ? Global.A : Empty Array;
		Global.killballnumber = Count Of(Global.killballnumber) ? Global.killballnumber : Empty Array;
		Global.H = Count Of(Global.H) ? Global.H : Empty Array;
		Global.I = Count Of(Global.I) ? Global.I : Empty Array;
		Global.K = Count Of(Global.K) ? Global.K : Empty Array;
		Global.J = 0;
		Global.TQ = Count Of(Global.TQ) ? Global.TQ : Empty Array;
		Global.TQ2 = Count Of(Global.TQ2) ? Global.TQ2 : Empty Array;
		Global.EditMode = Count Of(Global.EditMode) ? Global.EditMode : Empty Array;
		Global.TQ1 = 0;
		Global.TQ5 = Count Of(Global.TQ5) ? Global.TQ5 : Empty Array;
		Global.TQ6 = Count Of(Global.TQ6) ? Global.TQ6 : Empty Array;
		Global.BounceToggleLock = Count Of(Global.BounceToggleLock) ? Global.BounceToggleLock : Empty Array;
		Global.LeaderBoardFull = Empty Array;
		Wait(1, Ignore Condition);
		"This probably isn't necessary"
		Global.B = Count Of(Global.A) - 1;
		"KILLBALL()\r\n wait(2)\r\n pinball()"
		Global.PortalOn = Workshop Setting Toggle(Custom String("map settings"), Custom String("enable portals (control maps)"), True, 0);
		"hudText(getAllPlayers(), \"\", null, \"{0} {1} {2}\".format(\"Time left until server resets:\", 90 - floor(getTotalTimeElapsed() / 60), \"Minutes\"), HudPosition.RIGHT, -15, Color.WHITE, Color.WHITE, Color.RED, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAU"
		Global.save = Empty Array;
		"old board\r\n new board"
		Create HUD Text(First Of(Global.LeaderBoardFull) ? All Players(All Teams) : Null, Null, Null, Custom String(" \n{0} Top 5 {0}",
			Ability Icon String(Hero(Genji), Button(Primary Fire))), Right, 0, Null, Null, Color(White), Visible To, Default Visibility);
		Create HUD Text(First Of(Global.LeaderBoardFull) != Null ? All Players(All Teams) : Null, Hero Icon String(Hero(Genji)), First Of(
			First Of(Global.LeaderBoardFull)), Custom String("{0} ", First Of(Global.LeaderBoardFull)[2]), Right, 1, Color(Red), Color(
			Red), Color(Red), Visible To and String, Default Visibility);
		Create HUD Text(Global.LeaderBoardFull[1] != Null ? All Players(All Teams) : Null, Hero Icon String(Hero(Genji)), First Of(
			Global.LeaderBoardFull[1]), Custom String("{0} ", Global.LeaderBoardFull[1][2]), Right, 2, Color(Orange), Color(Orange), Color(
			Orange), Visible To and String, Default Visibility);
		Create HUD Text(Global.LeaderBoardFull[2] != Null ? All Players(All Teams) : Null, Hero Icon String(Hero(Genji)), First Of(
			Global.LeaderBoardFull[2]), Custom String("{0} ", Global.LeaderBoardFull[2][2]), Right, 3, Color(Yellow), Color(Yellow), Color(
			Yellow), Visible To and String, Default Visibility);
		Create HUD Text(Global.LeaderBoardFull[3] != Null ? All Players(All Teams) : Null, Hero Icon String(Hero(Genji)), First Of(
			Global.LeaderBoardFull[3]), Custom String("{0} ", Global.LeaderBoardFull[3][2]), Right, 4, Color(Lime Green), Color(
			Lime Green), Color(Lime Green), Visible To and String, Default Visibility);
		Create HUD Text(Global.LeaderBoardFull[4] != Null ? All Players(All Teams) : Null, Hero Icon String(Hero(Genji)), First Of(
			Global.LeaderBoardFull[4]), Custom String("{0} ", Global.LeaderBoardFull[4][2]), Right, 5, Color(Green), Color(Green), Color(
			Green), Visible To and String, Default Visibility);
		"hudSubtext(getAllPlayers(), \"-   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -\", HudPosition.RIGHT, -5, Color.WHITE, HudReeval.VISIBILITY, SpecVisibility.DEFAULT)"
		Create HUD Text(Local Player.LeaderboardToggle, Custom String("　　　　 {0} Leaderboard {0} 　　　", Icon String(Flag)), Null, Null, Top,
			-9999, Color(Blue), Null, Null, Visible To, Default Visibility);
		Create HUD Text(Local Player.LeaderboardToggle, Custom String("　　　　　　　　　　　　　　　　　　\n　 1:　{0} - {1}　\n　 2:　{2}", First Of(
			Global.LeaderBoardFull) ? First Of(First Of(Global.LeaderBoardFull)) : Custom String(""), First Of(Global.LeaderBoardFull)
			? First Of(Global.LeaderBoardFull)[2] : Custom String(""), Custom String("{0} - {1}　\n　 3:　{2}",
			Global.LeaderBoardFull[1] ? First Of(Global.LeaderBoardFull[1]) : Custom String(""),
			Global.LeaderBoardFull[1] ? Global.LeaderBoardFull[1][2] : Custom String(""), Custom String("{0} - {1}　\n　 4:　{2}",
			Global.LeaderBoardFull[2] ? First Of(Global.LeaderBoardFull[2]) : Custom String(""),
			Global.LeaderBoardFull[2] ? Global.LeaderBoardFull[2][2] : Custom String(""), Custom String("{0} - {1}　\n　 5:　{2}",
			Global.LeaderBoardFull[3] ? First Of(Global.LeaderBoardFull[3]) : Custom String(""),
			Global.LeaderBoardFull[3] ? Global.LeaderBoardFull[3][2] : Custom String(""), Custom String("{0} - {1}\n",
			Global.LeaderBoardFull[4] ? First Of(Global.LeaderBoardFull[4]) : Custom String(""),
			Global.LeaderBoardFull[4] ? Global.LeaderBoardFull[4][2] : Custom String("")))))), Null, Null, Top, -999, Color(White), Null,
			Null, Visible To and String, Default Visibility);
		Create HUD Text(Global.LeaderBoardFull[5] ? Local Player.LeaderboardToggle : Null, Custom String(
			"　　　　　　　　　　　　　　　　　　\n　 6:　{0} - {1}　\n　 7:　{2}", Global.LeaderBoardFull[5] ? First Of(Global.LeaderBoardFull[5])
			: Custom String(""), Global.LeaderBoardFull[5] ? Global.LeaderBoardFull[5][2] : Custom String(""), Custom String(
			"{0} - {1}　\n　 8:　{2}", Global.LeaderBoardFull[6] ? First Of(Global.LeaderBoardFull[6]) : Custom String(""),
			Global.LeaderBoardFull[6] ? Global.LeaderBoardFull[6][2] : Custom String(""), Custom String("{0} - {1}　\n　 9:　{2}",
			Global.LeaderBoardFull[7] ? First Of(Global.LeaderBoardFull[7]) : Custom String(""),
			Global.LeaderBoardFull[7] ? Global.LeaderBoardFull[7][2] : Custom String(""), Custom String("{0} - {1}　\n　10:　{2}",
			Global.LeaderBoardFull[8] ? First Of(Global.LeaderBoardFull[8]) : Custom String(""),
			Global.LeaderBoardFull[8] ? Global.LeaderBoardFull[8][2] : Custom String(""), Custom String("{0} - {1}\n",
			Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[9]) : Custom String(""),
			Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[9][2] : Custom String("")))))), Null, Null, Top, -998, Color(White), Null,
			Null, Visible To and String, Default Visibility);
		Create HUD Text(Global.LeaderBoardFull[10] ? Local Player.LeaderboardToggle : Null, Custom String(
			"　　　　　　　　　　　　　　　　　　\n　11:　{0} - {1}　\n　12:　{2}", Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[10])
			: Custom String(""), Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[10][2] : Custom String(""), Custom String(
			"{0} - {1}　\n　13:　{2}", Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[11]) : Custom String(""),
			Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[11][2] : Custom String(""), Custom String("{0} - {1}　\n　14:　{2}",
			Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[12]) : Custom String(""),
			Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[12][2] : Custom String(""), Custom String("{0} - {1}　\n　15:　{2}",
			Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[13]) : Custom String(""),
			Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[13][2] : Custom String(""), Custom String("{0} - {1}\n",
			Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[14]) : Custom String(""),
			Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[14][2] : Custom String("")))))), Null, Null, Top, -997, Color(White), Null,
			Null, Visible To and String, Default Visibility);
		Create HUD Text(Global.LeaderBoardFull[15] ? Local Player.LeaderboardToggle : Null, Custom String(
			"　　　　　　　　　　　　　　　　　　\n　16:　{0} - {1}　\n　17:　{2}", Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[15])
			: Custom String(""), Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[15][2] : Custom String(""), Custom String(
			"{0} - {1}　\n　18:　{2}", Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[16]) : Custom String(""),
			Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[16][2] : Custom String(""), Custom String("{0} - {1}　\n　19:　{2}",
			Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[17]) : Custom String(""),
			Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[17][2] : Custom String(""), Custom String("{0} - {1}　\n　20:　{2}",
			Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[18]) : Custom String(""),
			Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[18][2] : Custom String(""), Custom String("{0} - {1}\n",
			Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[19]) : Custom String(""),
			Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[19][2] : Custom String("")))))), Null, Null, Top, -996, Color(White), Null,
			Null, Visible To and String, Default Visibility);
		Create HUD Text(All Players(All Teams), Null, Null, Custom String(
			"                                                   \r\n  \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"),
			Top, -6, Null, Null, Color(Orange), Visible To, Default Visibility);
		"normal"
		Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0}+{1}+{2} | Restart", Input Binding String(Button(Crouch)),
			Input Binding String(Button(Ability 2)), Input Binding String(Button(Interact))), Right, -20, Null, Null, Color(White),
			Visible To and String, Default Visibility);
		Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0}+{1} | Invincible{2}", Input Binding String(Button(Reload)),
			Input Binding String(Button(Melee)), Local Player.C == 1 ? Custom String(" | ON") : Custom String("")), Right, -19, Null, Null,
			Local Player.C == 1 ? Color(Green) : Color(White), Visible To String and Color, Default Visibility);
		Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0} {1} |  {2}", Local Player.quick_restart ? Custom String("")
			: Custom String("Hold"), Input Binding String(Button(Reload)), Local Player.quick_restart ? Custom String("Quick reset")
			: Custom String("Enable Quick reset")), Right, -18, Null, Null, Color(White), Visible To and String, Default Visibility);
		Create HUD Text(Host Player.E < 1 ? All Players(All Teams) : Null, Null, Null, Custom String("Hold {0} | leaderboard",
			Input Binding String(Button(Melee))), Right, -17, Null, Null, Color(White), Visible To and String, Default Visibility);
		"hudText(getAllPlayers() if hostPlayer.EditModeSelection < 1 else null, null,\"Walk left/right | preview others\\nAim | change preview angle\" if localPlayer.isHoldingButton(Button.PRIMARY_FIRE) else \"\", \"Hold {0} | Preview orb/portal\".format(buttonString(Butt"
		Create HUD Text(Host Player.E < 1 ? All Players(All Teams) : Null, Null, Null, Custom String("Hold {0} | Preview orb/portal",
			Input Binding String(Button(Primary Fire))), Right, -16, Null, Null, Is Button Held(Local Player, Button(Primary Fire))
			? Color(Green) : (Is Button Held(Local Player, Button(Primary Fire)) ? Color(Green) : Color(White)),
			Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.E < 1 && Is Button Held(Local Player, Button(Primary Fire)) ? All Players(All Teams) : Null, Null,
			Custom String("Walk left/right | preview others\nAim | change preview angle"), Null, Right, -15, Null, Color(Lime Green), Null,
			Visible To and String, Default Visibility);
		Create HUD Text(Host Player.E < 1 ? All Players(All Teams) : Null, Null, Null, Custom String("Hold {0} | Spectate{1}",
			Input Binding String(Button(Interact)), Local Player.F ? Custom String(" | ON") : Custom String("")), Right, -14, Null, Null,
			Local Player.F ? Color(Green) : Color(White), Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.E < 1 ? All Players(All Teams) : Null, Null, Null, Custom String("Hold {0} | invisible{1}",
			Input Binding String(Button(Ability 2)), Local Player.invis ? Custom String(" | ON") : Custom String("")), Right, -13, Null,
			Null, Local Player.invis ? Color(Green) : Color(White), Visible To String and Color, Default Visibility);
		"hudSubtext([i for i in getAllPlayers() if i.CurrentCheckpoint == len(CheckpointPositions) - 1 and i.EditModeSelection < 1 and i.PracticeToggle != 1], \"Hold {0} | Toggle Traces\".format(abilityIconString(Hero.GENJI,Button.ULTIMATE)), HudPosition.RIGHT, -14, "
		Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.A == Count Of(Global.A)
			- 1 && Current Array Element.E < 1 && Current Array Element.PracticeToggle != 1), Null, Null, Custom String(
			"Hold {0} | Traces{1}", Ability Icon String(Hero(Genji), Button(Ultimate)), Local Player.TracesOff ? Custom String("")
			: Custom String(" | ON ")), Right, -12, Null, Null, Local Player.TracesOff ? Color(White) : Color(Green),
			Visible To String and Color, Default Visibility);
		Create HUD Text(Local Player.E < 1 ? All Players(All Teams) : Null, Null, Null, Custom String("{0} + {1} | Practice{2}",
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Melee)), Local Player.PracticeToggle ? Custom String(
			" | ({0})", Local Player.A - Local Player.PracticeCheckpoint) : Custom String("")), Right, -11, Null, Null,
			Local Player.PracticeToggle ? Color(Green) : (Local Player.C == 1 ? Color(Gray) : Color(White)), Visible To String and Color,
			Default Visibility);
		Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.PracticeToggle && Host Player.E < 1), Null,
			Custom String("{0} + {1} | Next level\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)),
			Custom String("{0} + {1} | Previous level\n{2} | Start from practice cp ", Input Binding String(Button(Crouch)),
			Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Interact)))), Null, Right, -10, Null, Color(
			Lime Green), Null, Visible To String and Color, Default Visibility);
		If(!Host Player.EditorOn);
			Global.Difficultyhud = Workshop Setting Combo(Custom String("map settings"), Custom String("difficulty (display hud)"), 0, Array(
				Custom String("beginner"), Custom String("easy-"), Custom String("easy"), Custom String("easy+"), Custom String("medium-"),
				Custom String("medium"), Custom String("medium+"), Custom String("hard-"), Custom String("hard"), Custom String("hard+"),
				Custom String("very hard-"), Custom String("very hard"), Custom String("very hard+"), Custom String("extreme-"), Custom String(
				"extreme"), Custom String("extreme+"), Custom String("hell"), Custom String("don't display")), 0);
			"17th entry is dont display"
			If(Global.Difficultyhud < 17);
				Create HUD Text(All Players(All Teams), Null, Array(Custom String("beginner"), Custom String("easy -"), Custom String("easy"),
					Custom String("easy +,"), Custom String("medium -"), Custom String("medium"), Custom String("medium +"), Custom String(
					"hard -"), Custom String("hard"), Custom String("hard +"), Custom String("very hard -"), Custom String("very hard"),
					Custom String("very hard +"), Custom String("extreme -"), Custom String("extreme"), Custom String("extreme +"), Custom String(
					"hell"))[Global.Difficultyhud], Null, Top, -24, Null, Array(Color(Green), Color(Lime Green), Color(Lime Green), Color(
					Lime Green), Color(Yellow), Color(Yellow), Color(Yellow), Color(Orange), Color(Orange), Color(Orange), Custom Color(255, 69, 0,
					255), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Color(Red), Color(Red), Color(Red), Custom Color(150, 0, 0,
					255))[Global.Difficultyhud], Null, Visible To, Default Visibility);
			End;
		End;
		Wait(5, Ignore Condition);
		Call Subroutine(KILLBALL);
		Wait(2, Ignore Condition);
		Call Subroutine(pinball);
		Wait(2, Ignore Condition);
		Call Subroutine(BuildPortals);
		"Check for editor/host spawn to redo effect reeval"
		Wait Until(Has Spawned(Host Player), 99999);
		Abort If(!Host Player.EditorOn);
		Call Subroutine(RebuildKillOrbs);
		Call Subroutine(RebuildBounceOrbs);
	}
}

rule("Match time")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		If(Current Game Mode != Game Mode(Skirmish));
			Wait(0.250, Ignore Condition);
			Set Match Time(1);
			Wait(1.100, Ignore Condition);
			Set Match Time(1);
			Wait(1.100, Ignore Condition);
			Wait(10, Ignore Condition);
		End;
		Set Match Time(69);
		Pause Match Time;
		Wait(5, Ignore Condition);
		"269"
		Global.TimeRemaining = 265;
		Create HUD Text(All Players(All Teams), Null, Custom String("  Server Restarts In {0} Min  ", Global.TimeRemaining), Null, Right,
			-200, Null, Color(Red), Null, Visible To and String, Visible Always);
		While(Global.TimeRemaining > 0);
			Wait(60, Ignore Condition);
			Global.TimeRemaining -= 1;
		End;
		Big Message(All Players(All Teams), Custom String("maximum lobby time expired, restarting"));
		Wait(5, Ignore Condition);
		If(Current Game Mode == Game Mode(Deathmatch));
			Declare Player Victory(Host Player);
		Else;
			Declare Team Victory(Team Of(Host Player));
	}
}

rule("Genji Swapper 9000")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	actions
	{
		If(!Is Dummy Bot(Event Player));
			Start Forcing Player To Be Hero(Event Player, Hero(Genji));
	}
}

rule("Initialize and CP HUD")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		"@Hero genji"
		Has Spawned(Event Player) == True;
		Hero Of(Event Player) == Hero(Genji);
	}

	actions
	{
		Create HUD Text(Event Player, Null, Null, Custom String("{0} {1}", Custom String("Level "), Custom String("{0} / {1}",
			Event Player.A, Count Of(Global.A) - 1)), Top, -14, Null, Null, Color(White), Visible To and String, Default Visibility);
		Create HUD Text(Array(Count Of(Filtered Array(Global.TQ, Global.pinballnumber[Index Of Array Value(Global.TQ,
			Current Array Element)] == Event Player.A && Global.BounceToggleLock[Index Of Array Value(Global.TQ, Current Array Element)
			] == True)) > 0 ? Event Player : Null), Null, Null, Custom String("{0} / {1} orange orbs",
			Event Player.LockCollected == 0 ? Custom String("0") : Count Of(Event Player.LockCollected) - 1, Count Of(Filtered Array(
			Global.TQ, Global.pinballnumber[Index Of Array Value(Global.TQ, Current Array Element)
			] == Event Player.A && Global.BounceToggleLock[Index Of Array Value(Global.TQ, Current Array Element)] == True))), Top, -13,
			Null, Null, Color(White), Visible To and String, Default Visibility);
		"LEFT, -2"
		Create HUD Text(Event Player, Null, Null, Custom String("Time {0}", Custom String("{0} sec", Event Player.D)), Left, -5, Null,
			Null, Color(White), Visible To and String, Default Visibility);
		"breaks if the defined thing is on the same line"
		Event Player.EditorOn = Workshop Setting Toggle(Custom String("Editor"), Custom String("Editor mode"), False, 0);
		"StartGame_Sub is the initialization of the game"
		Call Subroutine(Sub1);
		Enable Death Spectate All Players(Event Player);
		Enable Death Spectate Target HUD(Event Player);
		Event Player.F = 0;
		"Climbing the wall prompts the HUD"
		Event Player.J = 2;
		"CheckpointEffect_Sub is the checkpoint effect display"
		Call Subroutine(Sub0);
		Disable Game Mode HUD(Event Player);
	}
}

rule("SUB | Checkpoint Fail")
{
	event
	{
		Subroutine;
		checkpointFailReset;
	}

	actions
	{
		Event Player.LockCollected = Null;
		Cancel Primary Action(Event Player);
		If(Event Player.E < 1 && Event Player.A < Count Of(Global.A) - 1);
			Set Ability 1 Enabled(Event Player, False);
			Set Ultimate Ability Enabled(Event Player, False);
		End;
		Apply Impulse(Event Player, Down, Speed Of(Event Player), To Player, Cancel Contrary Motion);
		Set Status(Event Player, Null, Rooted, 0.100);
		Teleport(Event Player, Count Of(Global.A[Event Player.A]) != 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A]);
		If(Global.deathjump == True && Event Player.C == 0 && Event Player.A < Count Of(Global.A) - 1);
			"if eventPlayer.isOnWall():\r\n     smallMessage(eventPlayer, \"Deathbhop is banned!\")"
			Disallow Button(Event Player, Button(Jump));
			Wait(0.100, Ignore Condition);
			Allow Button(Event Player, Button(Jump));
		End;
		If(Event Player.A == 0);
			Event Player.D = 0;
		End;
		If(Is Using Ultimate(Event Player));
			Kill(Event Player, Null);
		End;
	}
}

rule("SUB | Checkpoint Effects")
{
	event
	{
		Subroutine;
		Sub0;
	}

	actions
	{
		Abort If(First Of(Event Player.B) != Null);
		Create Effect(Event Player.A <= Count Of(Global.A) - 1 ? Event Player : Null, Ring, Color(Sky Blue), Count Of(
			Global.A[Event Player.A]) != 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A], 1, Visible To Position and Radius);
		Event Player.B[0] = Last Created Entity;
		Create Effect(Event Player.A < Count Of(Global.A) - 1 ? Event Player : Null, Ring, Color(Lime Green), Global.A[Event Player.A + 1],
			1, Visible To Position and Radius);
		Event Player.B[1] = Last Created Entity;
		Create Effect(Event Player.A < Count Of(Global.A) - 1 ? Event Player : Null, Light Shaft, Color(White),
			Global.A[Event Player.A + 1], 1, Visible To Position and Radius);
		Event Player.B[2] = Last Created Entity;
		Create Icon(Event Player.A < Count Of(Global.A) - 1 ? Event Player : Null, Global.A[Event Player.A + 1] + Vector(0, 1, 0),
			Arrow: Down, Visible To and Position, Color(Sky Blue), True);
		Event Player.B[3] = Last Created Entity;
		Create In-World Text(Event Player.A < Count Of(Global.A) - 1 ? Event Player : Null, Custom String("Come here"),
			Global.A[Event Player.A + 1], 1.500, Do Not Clip, Visible To Position and String, Color(White), Default Visibility);
		Event Player.B[4] = Last Text ID;
	}
}

rule("SUB | Start Game")
{
	event
	{
		Subroutine;
		Sub1;
	}

	actions
	{
		If(Is Using Ultimate(Event Player));
			Kill(Event Player, Null);
		End;
		If(Count Of(Global.A) != 0);
			If(Array Contains(Global.save, Custom String("{0}", Event Player)));
				"if \"{0}\".format(eventPlayer) in save == true:"
				Event Player.A = Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 1];
				Event Player.D = Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 2];
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 3] = Event Player;
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 4] = Total Time Elapsed;
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 5] = 0;
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 6] = 0;
				Teleport(Event Player, Global.A[Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 1]] + Vector(0,
					1, 0));
			Else;
				Teleport(Event Player, First Of(Global.A) + Vector(0, 1, 0));
				Event Player.A = 0;
				Event Player.D = 0;
				Stop Chasing Player Variable(Event Player, ztjs);
				Event Player.ztjs = 0;
				Modify Global Variable(save, Append To Array, Array(Custom String("{0}", Event Player), Event Player.A, Event Player.D,
					Event Player, Total Time Elapsed, 0, 0));
			End;
		End;
		Chase Player Variable At Rate(Event Player, D, 9999999.000, 1, Destination and Rate);
		"eventPlayer.PortalText = []"
		If(Event Player.E < 1 && !Host Player.EditorOn);
			Set Ability 1 Enabled(Event Player, False);
			Set Ultimate Ability Enabled(Event Player, False);
		Else;
			Global.B = Global.B != -1 ? 0 : -1;
			Set Ability 1 Enabled(Event Player, True);
			Set Ultimate Ability Enabled(Event Player, True);
			Set Ultimate Charge(Event Player, 100);
		End;
		Set Status(Event Player, Null, Phased Out, 9999);
		Set Status(Event Player, Null, Invincible, 9999);
		"ListPlayersAtCheckpoints[eventPlayer.CurrentCheckpoint].append(eventPlayer)"
		Event Player.LockCollected = Null;
		Event Player.C = 0;
		disabled Event Player.LockState = False;
		Call Subroutine(UpdateCache);
	}
}

rule("SUB | Leaderboard Update")
{
	event
	{
		Subroutine;
		Leaderboardupdate;
	}

	actions
	{
		Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
			+ 1);
		Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
			+ 1);
		Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
			+ 1);
		Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
			+ 1);
		Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
			+ 1);
		Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
			+ 1);
		Modify Global Variable(save, Remove From Array By Value, Custom String("{0}", Event Player));
		"[i[0] for i in var1]   list of first element of each in var 1\r\n [ [name, seconds, prettytime] ]\r\n you already have a time"
		If(Array Contains(Mapped Array(Global.LeaderBoardFull, First Of(Current Array Element)), Custom String("{0}", Event Player)));
			"new time worse"
			If(Event Player.D > First Of(Filtered Array(Global.LeaderBoardFull, First Of(Current Array Element) == Custom String("{0}",
				Event Player)))[1]);
				"printLog(\"{0} - {1} - worse time then old\".format(eventPlayer,eventPlayer.Timer))"
				Skip(17);
			"new time better"
			Else;
				Modify Global Variable(LeaderBoardFull, Remove From Array By Value, Filtered Array(Global.LeaderBoardFull, First Of(
					Current Array Element) == Custom String("{0}", Event Player)));
				Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player), Event Player.D,
					Custom String("{0} sec", Event Player.D))));
			End;
		"you are not in list yet"
		Else;
			"board has room for more"
			If(Count Of(Global.LeaderBoardFull) < 20);
				Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player), Event Player.D,
					Custom String("{0} sec", Event Player.D))));
			"20 entries already"
			Else;
				"your time lower then last entry"
				If(Global.LeaderBoardFull[19][1] < Event Player.D);
					"printLog(\"{0} - {1} - existing times are better\".format(eventPlayer,eventPlayer.Timer))"
					Skip(7);
				"you beat the last entry, thus replacing it"
				Else;
					Modify Global Variable(LeaderBoardFull, Remove From Array By Index, 19);
					Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player), Event Player.D,
						Custom String("{0} sec", Event Player.D))));
				End;
			End;
		End;
		Global.LeaderBoardFull = Sorted Array(Global.LeaderBoardFull, Current Array Element[1]);
	}
}

rule("SUB | Kill Orb Effects")
{
	event
	{
		Subroutine;
		KILLBALL;
	}

	actions
	{
		Abort If(Global.H == Empty Array || Host Player.EditorOn == True);
		For Global Variable(NANBA, 0, Count Of(Global.H), 1);
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.A == Global.killballnumber[Evaluate Once(Global.NANBA)]), Sphere, Color(Blue), Global.H[Evaluate Once(
				Global.NANBA)], Global.I[Evaluate Once(Global.NANBA)], Visible To);
			Modify Global Variable(K, Append To Array, Last Created Entity);
			Wait(0.016, Ignore Condition);
		End;
	}
}

rule("SUB | Bounce Ball Effects")
{
	event
	{
		Subroutine;
		pinball;
	}

	actions
	{
		Abort If(Global.TQ == Empty Array || Host Player.EditorOn == True);
		For Global Variable(NANBA, 0, Count Of(Global.TQ), 1);
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.A == Global.pinballnumber[Evaluate Once(Global.NANBA)] && !Array Contains(
				Current Array Element.LockCollected, Global.TQ[Evaluate Once(Global.NANBA)])), Orb,
				Global.BounceToggleLock[Global.NANBA] ? Color(Orange) : Color(Green), Global.TQ[Evaluate Once(Global.NANBA)], 1, Visible To);
			Modify Global Variable(TQ2, Append To Array, Last Created Entity);
			Wait(0.016, Ignore Condition);
		End;
	}
}

rule("Checkpoint | Arrived")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Distance Between(Event Player, Global.A[Event Player.A + 1]) <= 1.400;
		Event Player.A < Count Of(Global.A) - 1;
		Is On Ground(Event Player) == True;
		(Event Player.E >= 1 || Event Player.C == 0) == True;
		Event Player.LockState == False;
	}

	actions
	{
		Event Player.MovedCheckpoint = True;
		"kill player if not colleted the locks"
		If(Count Of(Filtered Array(Global.TQ, Global.pinballnumber[Index Of Array Value(Global.TQ, Current Array Element)
			] == Event Player.A && Global.BounceToggleLock[Index Of Array Value(Global.TQ, Current Array Element)] == True)) > 0);
			If(Count Of(Filtered Array(Global.TQ, Global.pinballnumber[Index Of Array Value(Global.TQ, Current Array Element)
				] == Event Player.A && Global.BounceToggleLock[Index Of Array Value(Global.TQ, Current Array Element)
				] == True && Array Contains(Event Player.LockCollected, Current Array Element))) < Count Of(Filtered Array(Global.TQ,
				Global.pinballnumber[Index Of Array Value(Global.TQ, Current Array Element)
				] == Event Player.A && Global.BounceToggleLock[Index Of Array Value(Global.TQ, Current Array Element)] == True)));
				Small Message(Event Player, Custom String("! collect ALL orange orbs to unlock !"));
				Kill(Event Player, Null);
				Abort;
			End;
		End;
		Event Player.LockCollected = Null;
		Event Player.A += 1;
		Call Subroutine(UpdateCache);
		Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
		Play Effect(All Players(All Teams), Ring Explosion, Color(Sky Blue), Global.A[Event Player.A] + Vector(0, 1.500, 0), 4);
		Big Message(Event Player, Custom String("{0} {1}", Custom String("Arrived at"), Custom String("{0} / {1}", Event Player.A,
			Count Of(Global.A) - 1)));
		If(Event Player.PracticeToggle == 1);
			Event Player.PracticeCheckpoint += 1;
			Skip If(Event Player.A < Count Of(Global.A) - 1, 27);
			Skip If(Event Player.A >= Count Of(Global.A) - 1, 10);
		"normal cp, but also runs when completed"
		Else;
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Value, Custom String("{0}", Event Player));
			Modify Global Variable(save, Append To Array, Array(Custom String("{0}", Event Player), Event Player.A, Event Player.D,
				Event Player, Total Time Elapsed, 0, 0));
		End;
		If(Event Player.E < 1);
			Set Ultimate Ability Enabled(Event Player, False);
			Set Ability 1 Enabled(Event Player, False);
		End;
		Abort If(Event Player.E >= 1);
		"complete lvl"
		If(Event Player.A >= Count Of(Global.A) - 1);
			Set Ability 1 Enabled(Event Player, True);
			"eventPlayer.setUltEnabled(true)\r\neventPlayer.setUltCharge(100)"
			If(Event Player.PracticeToggle != 1);
				Set Ultimate Ability Enabled(Event Player, True);
				Set Ultimate Charge(Event Player, 100);
				Stop Chasing Player Variable(Event Player, D);
				"bigMessage(getAllPlayers(), \"{0} {1} {2}\".format(eventPlayer, \"Mission complete! Time\", l\"{0}\".format(prettyTime(eventPlayer.Timer))))"
				Big Message(All Players(All Teams), Custom String("{0} {1}", Event Player, Custom String("Mission complete! Time {0}",
					Custom String("{0} sec", Event Player.D))));
				"destroyEffect(eventPlayer.PlayerEffects[2])\r\n destroyIcon(eventPlayer.PlayerEffects[3])\r\n destroyInWorldText(eventPlayer.PlayerEffects[4])\r\nPortal1PlayerList.append(eventPlayer)\r\nPortal2PlayerList.append(eventPlayer)"
				Event Player.H = 2;
				Call Subroutine(Leaderboardupdate);
			End;
		End;
	}
}

rule("Checkpoint | Finish effects")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.A == Count Of(Global.A) - 1;
		Event Player.E < 1;
		Is Moving(Event Player) == True;
		Event Player.TracesOff == False;
		Event Player.PracticeToggle != 1;
	}

	actions
	{
		"@Condition (eventPlayer.isMoving() == true or eventPlayer.isHoldingButton(Button.JUMP) == true) == true\r\n rgb((cosDeg(modeList * 360 - 0) + 0.5) * 255, (cosDeg(modeList * 360 - 120) + 0.5) * 255, (cosDeg(modeList * 360 - 240) + 0.5) * 255)"
		Play Effect(All Players(All Teams), Ring Explosion, Custom Color((Cosine From Degrees(Total Time Elapsed / 2 * 360) + 0.500) * 255,
			(Cosine From Degrees(Total Time Elapsed / 2 * 360 - 120) + 0.500) * 255, (Cosine From Degrees(
			Total Time Elapsed / 2 * 360 - 240) + 0.500) * 255, 255), Position Of(Event Player), 1.600);
		Play Effect(All Players(All Teams), Ring Explosion, Custom Color((Cosine From Degrees(Total Time Elapsed / 2 * 360) + 0.500) * 255,
			(Cosine From Degrees(Total Time Elapsed / 2 * 360 - 120) + 0.500) * 255, (Cosine From Degrees(
			Total Time Elapsed / 2 * 360 - 240) + 0.500) * 255, 255), Position Of(Event Player), 1.400);
		Play Effect(All Players(All Teams), Ring Explosion, Custom Color((Cosine From Degrees(Total Time Elapsed / 2 * 360) + 0.500) * 255,
			(Cosine From Degrees(Total Time Elapsed / 2 * 360 - 120) + 0.500) * 255, (Cosine From Degrees(
			Total Time Elapsed / 2 * 360 - 240) + 0.500) * 255, 255), Position Of(Event Player), 1.200);
		Play Effect(All Players(All Teams), Ring Explosion, Custom Color((Cosine From Degrees(Total Time Elapsed / 2 * 360) + 0.500) * 255,
			(Cosine From Degrees(Total Time Elapsed / 2 * 360 - 120) + 0.500) * 255, (Cosine From Degrees(
			Total Time Elapsed / 2 * 360 - 240) + 0.500) * 255, 255), Position Of(Event Player), 1);
		Play Effect(All Players(All Teams), Ring Explosion, Custom Color((Cosine From Degrees(Total Time Elapsed / 2 * 360) + 0.500) * 255,
			(Cosine From Degrees(Total Time Elapsed / 2 * 360 - 120) + 0.500) * 255, (Cosine From Degrees(
			Total Time Elapsed / 2 * 360 - 240) + 0.500) * 255, 255), Position Of(Event Player), 0.800);
		Play Effect(All Players(All Teams), Ring Explosion, Custom Color((Cosine From Degrees(Total Time Elapsed / 2 * 360) + 0.500) * 255,
			(Cosine From Degrees(Total Time Elapsed / 2 * 360 - 120) + 0.500) * 255, (Cosine From Degrees(
			Total Time Elapsed / 2 * 360 - 240) + 0.500) * 255, 255), Position Of(Event Player), 0.600);
		Play Effect(All Players(All Teams), Ring Explosion, Custom Color((Cosine From Degrees(Total Time Elapsed / 2 * 360) + 0.500) * 255,
			(Cosine From Degrees(Total Time Elapsed / 2 * 360 - 120) + 0.500) * 255, (Cosine From Degrees(
			Total Time Elapsed / 2 * 360 - 240) + 0.500) * 255, 255), Position Of(Event Player), 0.400);
		Play Effect(All Players(All Teams), Ring Explosion, Custom Color((Cosine From Degrees(Total Time Elapsed / 2 * 360) + 0.500) * 255,
			(Cosine From Degrees(Total Time Elapsed / 2 * 360 - 120) + 0.500) * 255, (Cosine From Degrees(
			Total Time Elapsed / 2 * 360 - 240) + 0.500) * 255, 255), Position Of(Event Player), 0.200);
		Wait(0.350, Ignore Condition);
		Loop If Condition Is True;
	}
}

rule("Preview orbs/portals")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.A < Count Of(Global.A) - 1;
		Event Player.E < 1;
		Is Button Held(Event Player, Button(Primary Fire)) == True;
		Is Button Held(Event Player, Button(Crouch)) == False;
	}

	actions
	{
		Wait(0.500, Abort When False);
		Event Player.PreviewsArray = Filtered Array(Global.CustomPortalStart, Global.CustomPortalCP[Index Of Array Value(
			Global.CustomPortalStart, Current Array Element)] == Event Player.A);
		Modify Player Variable(Event Player, PreviewsArray, Append To Array, Filtered Array(Global.TQ,
			Global.pinballnumber[Index Of Array Value(Global.TQ, Current Array Element)
			] == Event Player.A && Global.BounceToggleLock[Index Of Array Value(Global.TQ, Current Array Element)] == True));
		"test if this doesnt mes up with empty thigns being apended"
		If(Count Of(Event Player.PreviewsArray) < 1 || Event Player.PreviewsArray == Null);
			Wait(0.016, Ignore Condition);
			Abort;
		End;
		Set Move Speed(Event Player, 0);
		Event Player.PreviewsI = 0;
		Start Camera(Event Player, Event Player.PreviewsArray[Event Player.PreviewsI] + Facing Direction Of(Event Player) * -3.500,
			Event Player.PreviewsArray[Event Player.PreviewsI], 15);
		While(Is Button Held(Event Player, Button(Primary Fire)) && Is Alive(Event Player));
			If(X Component Of(Throttle Of(Event Player)) < -0.500);
				If(Event Player.PreviewsI + 1 >= Count Of(Event Player.PreviewsArray));
					Event Player.PreviewsI = 0;
				Else;
					Event Player.PreviewsI += 1;
				End;
				Wait Until(X Component Of(Throttle Of(Event Player)) > -0.500, 1);
			Else If(X Component Of(Throttle Of(Event Player)) > 0.500);
				If(Event Player.PreviewsI > 0);
					Event Player.PreviewsI -= 1;
				Else;
					Event Player.PreviewsI = Count Of(Event Player.PreviewsArray) - 1;
				End;
				Wait Until(X Component Of(Throttle Of(Event Player)) < 0.500, 1);
			End;
			Wait(0.016, Ignore Condition);
		End;
		Stop Camera(Event Player);
		Set Move Speed(Event Player, 100);
	}
}

rule("Toggle Traces")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Ultimate)) == True;
		Event Player.A == Count Of(Global.A) - 1;
		Event Player.E < 1;
		Event Player.PracticeToggle != 1;
	}

	actions
	{
		Wait(1, Abort When False);
		Event Player.TracesOff = !Event Player.TracesOff;
		Play Effect(Event Player, Buff Impact Sound, Null, Event Player, 100);
		Small Message(Event Player, Custom String("Traces {0}", Event Player.TracesOff ? Custom String("off") : Custom String("on")));
		Play Effect(Event Player, Debuff Impact Sound, Null, Event Player, 100);
	}
}

rule("Kill Orb | Activate")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		"@Condition eventPlayer.CurrentCheckpoint != 0"
		Event Player.A < Count Of(Global.A) - 1;
		Event Player.C == 0;
		"@Condition (KillballCheckpoints[KillBallPositions.index(([player for player in KillBallPositions if distance(eventPlayer, player) <= KillBallRadii[KillBallPositions.index(player)]])[0])] == eventPlayer.CurrentCheckpoint or KillballCheckpoints[KillBallPosit"
		Event Player.KillPosition_Cache != Empty Array;
		Is True For Any(Event Player.KillPosition_Cache, Distance Between(Current Array Element, Event Player)
			<= Event Player.KillRadii_Cache[Index Of Array Value(Event Player.KillPosition_Cache, Current Array Element)]) == True;
	}

	actions
	{
		"kill(eventPlayer, null)"
		Call Subroutine(checkpointFailReset);
	}
}

rule("Bounce Ball | Activate")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		"@Condition eventPlayer.CurrentCheckpoint != 0"
		Event Player.BouncePosition_Cache != Empty Array;
		Is True For Any(Event Player.BouncePosition_Cache, Distance Between(Current Array Element, Event Player) < 1.400) == True;
	}

	actions
	{
		Event Player.bouncetouched = Index Of Array Value(Event Player.BouncePosition_Cache, First Of(Sorted Array(Filtered Array(
			Event Player.BouncePosition_Cache, Distance Between(Event Player, Current Array Element) < 1.400 && !Array Contains(
			Event Player.LockCollected, Current Array Element)), Distance Between(Event Player, Current Array Element))));
		"eventPlayer.applyImpulse(Vector.UP, BounceStrength[BouncePositions.index([player for player in BouncePositions if distance(eventPlayer.getPosition(), player) <= 2])], Relativity.TO_WORLD, Impulse.CANCEL_CONTRARY_MOTION)"
		If(Event Player.BounceStrength_Cache[Event Player.bouncetouched] != 0);
			Apply Impulse(Event Player, Up, Event Player.BounceStrength_Cache[Event Player.bouncetouched], To World, Cancel Contrary Motion);
		End;
		"if BounceToggleDash[BouncePositions.index([player for player in BouncePositions if distance(eventPlayer.getPosition(), player) <= 2])] == true:"
		If(Event Player.BounceDash_Cache[Event Player.bouncetouched]);
			Set Ability 1 Enabled(Event Player, True);
			Small Message(Event Player, Custom String("Dash is ready"));
			Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
		End;
		"if BounceToggleUlt[BouncePositions.index([player for player in BouncePositions if distance(eventPlayer.getPosition(), player) <= 2])] == true:"
		If(Event Player.BounceUlt_Cache[Event Player.bouncetouched]);
			Set Ultimate Ability Enabled(Event Player, True);
			Set Ultimate Charge(Event Player, 100);
			Small Message(Event Player, Custom String("Ultimate is ready"));
			Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
		End;
		"if BounceToggleLock[BouncePositions.index([player for player in BouncePositions if distance(eventPlayer.getPosition(), player) <= 2])] == true:"
		If(Event Player.BounceLock_Cache[Event Player.bouncetouched]);
			Modify Player Variable(Event Player, LockCollected, Append To Array,
				Event Player.BouncePosition_Cache[Event Player.bouncetouched]);
			Small Message(Event Player, Custom String("orb has been collected"));
			Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
	}
}

rule("Death Reset")
{
	event
	{
		Player Died;
		All;
		All;
	}

	conditions
	{
		Event Player.F != 1;
		Count Of(Global.A) >= 2;
	}

	actions
	{
		Event Player.LockCollected = Null;
		Clear Status(Event Player, Phased Out);
		Resurrect(Event Player);
		Teleport(Event Player, Count Of(Global.A[Event Player.A]) != 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A]);
	}
}

rule("Ground Reset")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		Event Player.A < Count Of(Global.A) - 1;
		Count Of(Global.A) >= 2;
		Event Player.C == 0;
		Event Player.F != 1;
		Is On Ground(Event Player) == True;
		Event Player.LockState == False;
		Distance Between(Event Player, Count Of(Global.A[Event Player.A]) != 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A])
			> 1.400;
	}

	actions
	{
		Call Subroutine(checkpointFailReset);
	}
}

rule("Player Effect")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Alive(Event Player) == True;
		Has Status(Event Player, Phased Out) == False;
	}

	actions
	{
		Set Status(Event Player, Null, Phased Out, 9999);
		Set Status(Event Player, Null, Invincible, 9999);
	}
}

rule("Ultimate Charge")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Ultimate Charge Percent(Event Player) < 100;
	}

	actions
	{
		Set Ultimate Charge(Event Player, 100);
	}
}

rule("Player Leaves")
{
	event
	{
		Player Left Match;
		All;
		All;
	}

	actions
	{
		"if player's cur_checkpoint is 0, delete save info"
		If(Global.save[Index Of Array Value(Global.save, Event Player) - 2] == 0);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Event Player) + 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Event Player) + 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Event Player) + 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Event Player) - 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Event Player) - 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Event Player) - 1);
			Modify Global Variable(save, Remove From Array By Value, Event Player);
		Else;
			Skip If(Global.save[Index Of Array Value(Global.save, Event Player) - 2] >= Count Of(Global.A) - 1, 2);
			Skip If(Global.save[Index Of Array Value(Global.save, Event Player) + 3] == 1, 1);
			Global.save[Index Of Array Value(Global.save, Event Player) - 1] = Total Time Elapsed - Global.save[Index Of Array Value(
				Global.save, Event Player) + 1] - Global.save[Index Of Array Value(Global.save, Event Player)
				+ 2] + Global.save[Index Of Array Value(Global.save, Event Player) - 1];
			Global.save[Index Of Array Value(Global.save, Event Player) + 2] = 0;
			Global.save[Index Of Array Value(Global.save, Event Player) + 3] = 0;
	}
}

rule("Combo | Leaderboard Toggle | Melee toggle")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Melee)) == True;
		Event Player.E < 1;
	}

	actions
	{
		Wait(1, Abort When False);
		Event Player.LeaderboardToggle = !Event Player.LeaderboardToggle;
	}
}

rule("Combo | Restart Run | Crouch + Interact + Deflect")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Crouch)) == True;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Ability 2)) == True;
	}

	actions
	{
		"@Condition eventPlayer.isUsingAbility1() == false if DashExploitToggle else true"
		Event Player.LockState = True;
		If(Global.DashExploitToggle && Is Using Ability 1(Event Player));
			Small Message(Event Player, Custom String("Dash Start is banned!"));
			Cancel Primary Action(Event Player);
			Wait Until(Is On Ground(Event Player), 0.600);
			Event Player.LockState = False;
			Abort;
		End;
		Event Player.flytoggle = Null;
		Event Player.A = 0;
		Event Player.PracticeToggle = 0;
		Event Player.PracticeCheckpoint = 0;
		Event Player.C = 0;
		If(Array Contains(Global.save, Custom String("{0}", Event Player)));
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Index, Index Of Array Value(Global.save, Custom String("{0}", Event Player))
				+ 1);
			Modify Global Variable(save, Remove From Array By Value, Custom String("{0}", Event Player));
		End;
		Call Subroutine(Sub1);
		Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
		Wait(0.016, Ignore Condition);
		"Portal1PlayerList.remove(eventPlayer)\r\nPortal2PlayerList.remove(eventPlayer)"
		Event Player.LockState = False;
	}
}

rule("Combo | Enter Spectate | Hold Interact")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Ability 2)) == False;
		Event Player.E < 1;
	}

	actions
	{
		Wait(1, Abort When False);
		Small Message(Event Player, Custom String("Hold Interact again to turn off spectate mode"));
		If(Is Alive(Event Player));
			If(Event Player.A < Count Of(Global.A) - 1);
				Chase Player Variable At Rate(Event Player, ztjs, 999999, 1, Destination and Rate);
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 2] = Event Player.D;
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 4] = Total Time Elapsed;
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 6] = 1;
			End;
			Set Respawn Max Time(Event Player, 9999);
			Event Player.F = 1;
			Stop Chasing Player Variable(Event Player, D);
			Wait(0.200, Ignore Condition);
			Kill(Event Player, Null);
			Teleport(Event Player, Count Of(Global.A[Event Player.A]) != 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A]);
		Else;
			Skip If(Event Player.E >= 1, 2);
			Respawn(Event Player);
			Event Player.F = 0;
			Teleport(Event Player, Count Of(Global.A[Event Player.A]) != 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A]);
			Skip If(Event Player.A >= Count Of(Global.A) - 1, 4);
			Set Ultimate Ability Enabled(Event Player, False);
			Set Ability 1 Enabled(Event Player, False);
			Skip If(Event Player.PracticeToggle == 1, 1);
			Chase Player Variable At Rate(Event Player, D, 10000, 1, Destination and Rate);
			Set Respawn Max Time(Event Player, 0);
			Event Player.C = 0;
			Event Player.LockCollected = Null;
			If(Event Player.A < Count Of(Global.A) - 1);
				Stop Chasing Player Variable(Event Player, ztjs);
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 5] = Event Player.ztjs;
				Event Player.ztjs = 0;
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 6] = 0;
	}
}

rule("Combo | Toggle Invincible Mode | Melee + Rel﻿oad")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Melee)) == True;
		Is Button Held(Event Player, Button(Reload)) == True;
		Is Using Ability 1(Event Player) == False;
		"@Condition eventPlayer.CurrentCheckpoint < len(CheckpointPositions) - 1"
		Is Alive(Event Player) == True;
		Is Using Ultimate(Event Player) == False;
	}

	actions
	{
		Event Player.LockCollected = Null;
		Event Player.flytoggle = Null;
		If(Event Player.C == 0);
			Abort If(Event Player.A >= Count Of(Global.A) - 1);
			Chase Player Variable At Rate(Event Player, ztjs, 999999, 1, Destination and Rate);
			Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 2] = Event Player.D;
			Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 4] = Total Time Elapsed;
			Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 6] = 1;
			Stop Chasing Player Variable(Event Player, D);
			Big Message(Event Player, Custom String("Invincible mode"));
			Event Player.flytoggle = Null;
			Set Ultimate Ability Enabled(Event Player, True);
			Set Ultimate Charge(Event Player, 100);
			Set Ability 1 Enabled(Event Player, True);
			Wait(0.200, Ignore Condition);
			Event Player.C = 1;
		Else;
			Start Forcing Player Position(Event Player, Count Of(Global.A[Event Player.A])
				!= 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A], True);
			Skip If(Event Player.E >= 1, 2);
			Set Ultimate Ability Enabled(Event Player, False);
			Set Ability 1 Enabled(Event Player, False);
			Teleport(Event Player, Count Of(Global.A[Event Player.A]) != 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A]);
			Wait(0.100, Ignore Condition);
			Event Player.C = 0;
			If(Event Player.PracticeToggle == 1);
				Big Message(Event Player, Custom String("Practice mode"));
			Else;
				Big Message(Event Player, Custom String("Normal mode"));
				Chase Player Variable At Rate(Event Player, D, 9999999.000, 1, Destination and Rate);
				Stop Chasing Player Variable(Event Player, ztjs);
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 5] = Event Player.ztjs;
				Event Player.ztjs = 0;
				Global.save[Index Of Array Value(Global.save, Custom String("{0}", Event Player)) + 6] = 0;
			End;
			Stop Forcing Player Position(Event Player);
			Event Player.flytoggle = Null;
	}
}

rule("Combo | Toggle Practice Mode | Melee + Ultimate")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Melee)) == True;
		Is Button Held(Event Player, Button(Ultimate)) == True;
		Event Player.E < 1;
		Is Using Ability 1(Event Player) == False;
		Event Player.A <= Count Of(Global.A) - 1;
		"@Condition eventPlayer.InvincibleToggle != 1"
		Is Alive(Event Player) == True;
	}

	actions
	{
		If(Event Player.C == 1);
			Small Message(Event Player, Custom String("Cannot leave practice mode while also in invincible mode"));
			Wait(0.016, Ignore Condition);
			Abort;
		End;
		Event Player.LockState = True;
		"waitUntil(eventPlayer.isUsingUltimate() == false or eventPlayer.PracticeToggle == 0, 3)"
		If(Is Using Ultimate(Event Player));
			Kill(Event Player, Null);
		End;
		Wait(0.160, Ignore Condition);
		Event Player.LockCollected = Null;
		If(Event Player.PracticeToggle == 0);
			Start Forcing Player Position(Event Player, Count Of(Global.A[Event Player.A])
				== 0 ? Global.A[Event Player.A] : Global.A[Event Player.A][1], True);
			Stop Chasing Player Variable(Event Player, D);
			Big Message(Event Player, Custom String("Practice mode"));
			Stop Forcing Player Position(Event Player);
			Wait(0.200, Ignore Condition);
			Event Player.PracticeToggle = 1;
		Else;
			Start Forcing Player Position(Event Player, Count Of(Global.A[Event Player.A - Event Player.PracticeCheckpoint])
				== 0 ? Global.A[Event Player.A - Event Player.PracticeCheckpoint] : Global.A[Event Player.A - Event Player.PracticeCheckpoint][1],
				True);
			Call Subroutine(checkpointFailReset);
			Set Ability 1 Enabled(Event Player, False);
			Event Player.A -= Event Player.PracticeCheckpoint;
			Event Player.PracticeCheckpoint = 0;
			Wait(0.100, Ignore Condition);
			Event Player.PracticeToggle = 0;
			Big Message(Event Player, Custom String("Normal mode"));
			If(Event Player.A < Count Of(Global.A) - 1);
				Chase Player Variable At Rate(Event Player, D, 9999999.000, 1, Destination and Rate);
			Else;
				Set Ultimate Ability Enabled(Event Player, True);
				Set Ultimate Charge(Event Player, 100);
				Set Ability 1 Enabled(Event Player, True);
			End;
			Stop Forcing Player Position(Event Player);
		End;
		Wait(0.300, Ignore Condition);
		Event Player.LockState = False;
	}
}

rule("Combo | Practice Restart | Interact")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Ultimate)) == False;
		Is Button Held(Event Player, Button(Melee)) == False;
		Is Alive(Event Player) == True;
		Is Button Held(Event Player, Button(Crouch)) == False;
		Is Button Held(Event Player, Button(Ability 2)) == False;
		Event Player.E < 1;
		Event Player.PracticeToggle != False;
		Event Player.F != 1;
	}

	actions
	{
		"@Condition eventPlayer.CurrentCheckpoint - eventPlayer.PracticeCheckpoint <= 0 == true"
		Wait Until(!Is Button Held(Event Player, Button(Interact)), 0.900);
		Abort If(Is Button Held(Event Player, Button(Interact)));
		Event Player.LockCollected = Null;
		If(Is Using Ultimate(Event Player));
			Kill(Event Player, Null);
		End;
		If(Event Player.A >= Count Of(Global.A) - 1);
			Call Subroutine(Sub0);
		End;
		Teleport(Event Player, Global.A[Event Player.A - Event Player.PracticeCheckpoint]);
		"broken\r\neventPlayer.PracticeCheckpoint = eventPlayer.CurrentCheckpoint"
		Event Player.A -= Event Player.PracticeCheckpoint;
		"broken\r\neventPlayer.teleport(CheckpointPositions[eventPlayer.CurrentCheckpoint])"
		Event Player.PracticeCheckpoint = 0;
		Set Status(Event Player, Null, Rooted, 0.200);
	}
}

rule("Combo | Quick Reset | Rel﻿oad, Hold Rel﻿oad to Enable")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Reload)) == True;
	}

	actions
	{
		"@Condition eventPlayer.EditModeSelection < 1"
		Abort If(Is Button Held(Event Player, Button(Melee)));
		If(Event Player.quick_restart == True);
			Event Player.LockCollected = 0;
			If(Is Using Ultimate(Event Player));
				Kill(Event Player, Null);
			End;
			Start Forcing Player Position(Event Player, Count Of(Global.A[Event Player.A])
				!= 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A], True);
			Event Player.flytoggle = Null;
			Skip If(Event Player.E >= 1 || Event Player.C == 1 || Event Player.A >= Count Of(Global.A) - 1, 2);
			Set Ultimate Ability Enabled(Event Player, False);
			Set Ability 1 Enabled(Event Player, False);
			Teleport(Event Player, Count Of(Global.A[Event Player.A]) != 0 ? Global.A[Event Player.A][1] : Global.A[Event Player.A]);
			Wait(0.100, Ignore Condition);
			Stop Forcing Player Position(Event Player);
			Event Player.flytoggle = Null;
		End;
		Wait(1, Abort When False);
		If(Event Player.quick_restart == False);
			Event Player.quick_restart = True;
			Big Message(Event Player, Custom String("Quick reset is enabled"));
			Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
		Else If(Event Player.quick_restart == True);
			Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
			Event Player.quick_restart = False;
			Big Message(Event Player, Custom String("Quick reset is disabled"));
	}
}

rule("Combo | Invisible Toggle | Hold Deflect")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Event Player.E < 1;
	}

	actions
	{
		Wait(1, Abort When False);
		Event Player.invis = !Event Player.invis;
		Set Invisible(Event Player, None);
		If(Event Player.invis);
			Set Invisible(Event Player, All);
		End;
		Small Message(Event Player, Custom String("Invisible {0}", Event Player.invis ? Custom String("on") : Custom String("off")));
		Play Effect(Event Player, Debuff Impact Sound, Null, Event Player, 100);
	}
}

rule("Limit Ultimate")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		"The function of this rule is: ULT can only be used once when running the map"
		Is Using Ultimate(Event Player) == True;
		Event Player.A < Count Of(Global.A) - 1;
		Event Player.E < 1;
		Event Player.C == 0;
	}

	actions
	{
		Set Ultimate Ability Enabled(Event Player, False);
	}
}

rule("Limit Dash")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		"The function of this rule is: DASH can only be used once when running the map"
		Is Using Ability 1(Event Player) == True;
		Event Player.A < Count Of(Global.A) - 1;
		Event Player.E < 1;
		Event Player.C == 0;
	}

	actions
	{
		Set Ability 1 Enabled(Event Player, False);
	}
}

rule("Give Blade")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is On Ground(Event Player) == True;
		Event Player.A < Count Of(Global.A) - 1;
		Array Contains(Global.Dao, Event Player.A) == True;
		Distance Between(Event Player, Count Of(Global.A[Event Player.A]) > 1 ? Last Of(Global.A[Event Player.A])
			: Global.A[Event Player.A]) <= 1.400;
		Is Using Ultimate(Event Player) == False;
	}

	actions
	{
		Wait(0.100, Ignore Condition);
		Abort If(Is Using Ultimate(Event Player));
		Set Ultimate Ability Enabled(Event Player, True);
		Set Ultimate Charge(Event Player, 100);
		Small Message(Event Player, Custom String("Ultimate is ready"));
	}
}

rule("Give Dash")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is On Ground(Event Player) == True;
		Event Player.A < Count Of(Global.A) - 1;
		"@Condition distance(eventPlayer, A[eventPlayer.A]) <= 1.4"
		Array Contains(Global.SHIFT, Event Player.A) == True;
		Distance Between(Event Player, Count Of(Global.A[Event Player.A]) > 1 ? Last Of(Global.A[Event Player.A])
			: Global.A[Event Player.A]) <= 1.400;
		Is Using Ability 1(Event Player) == False;
	}

	actions
	{
		Set Ability 1 Enabled(Event Player, True);
		Small Message(Event Player, Custom String("Dash is ready"));
	}
}

disabled rule("------------------------------------------------------------------------ Checks ------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Checking | Jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Jump)) == True;
		Event Player.TY != 2;
	}

	actions
	{
		"and if it is turned off, it will still be banned for three stages after customs clearance.\r\n@Condition eventPlayer.A < len(A) - 1"
		Event Player.TY += 1;
	}
}

rule("Checking | Bhop in the air")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.TY == 0;
		Is In Air(Event Player) == True;
		Is Button Held(Event Player, Button(Jump)) == False;
	}

	actions
	{
		Event Player.O = 0;
	}
}

rule("Checking | In the air")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		Event Player.TY == 0;
		Is In Air(Event Player) == True;
	}

	actions
	{
		"and if it is turned off, it will still be banned for three stages after customs clearance.\r\n@Condition eventPlayer.A < len(A) - 1"
		Event Player.TY = 1;
	}
}

rule("Checking | Triple jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.TY == 1;
	}

	actions
	{
		Wait(0.100, Abort When False);
		Event Player.TY = 2;
	}
}

rule("Checking | Player on the wall")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		"This rule is also linked to the determination of wall climbing, please do not close/delete"
		Is On Wall(Event Player) == True;
		Is Button Held(Event Player, Button(Jump)) == True;
	}

	actions
	{
		Event Player.TY = 2;
		Event Player.J = 1;
	}
}

rule("Checking | Using Emote")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Communicating Any Emote(Event Player) == True;
	}

	actions
	{
		Event Player.O = 0;
	}
}

rule("Checking | Bhop")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.O == 0;
		Is Jumping(Event Player) == True;
	}

	actions
	{
		Event Player.O = 1;
		Small Message(Event Player, Custom String("Bhop"));
	}
}

rule("Checking | Create Bhop")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is On Wall(Event Player) == False;
		Is Button Held(Event Player, Button(Crouch)) == True;
		Is Button Held(Event Player, Button(Jump)) == False;
		Is On Ground(Event Player) == False;
		Is In Air(Event Player) == True;
		Is Jumping(Event Player) == False;
		Is Crouching(Event Player) == True;
	}

	actions
	{
		Event Player.O = 0;
		If(Global.kaxiaotiao == True && Event Player.C == 0 && Event Player.A < Count Of(Global.A) - 1);
			Small Message(Event Player, Custom String("Create Bhop is banned!"));
			Call Subroutine(checkpointFailReset);
			Abort;
		End;
		Small Message(Event Player, Custom String("Bhop has been created!"));
	}
}

rule("Checking | Bhop/Double Jump Initialization")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		Is On Ground(Event Player) == True;
	}

	actions
	{
		"Notes must be read! When this condition is turned on, the effect is \"Automatically open three stages after customs clearance\", \r\n and if it is turned off, three stages will still be banned after customs clearance.\r\n@Condition eventPlayer.A < len(A) - 1"
		Event Player.TY = 0;
		Event Player.J = 2;
		Wait(0, Ignore Condition);
		Loop If((Event Player.TY != 0 || Event Player.J != 2) && Is On Ground(Event Player));
		Event Player.O = 1;
	}
}

rule("Checking | Double jump, initialized with small jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		Is On Ground(Event Player) == True;
	}

	actions
	{
		"and if it is turned off, it will still be banned for three stages after customs clearance.\r\n@Condition eventPlayer.A < len(A) - 1"
		Event Player.TY = 0;
		Event Player.J = 2;
		Event Player.climbNum = 0;
		Wait(0, Ignore Condition);
		Loop If((Event Player.TY != 0 || Event Player.J != 2) && Is On Ground(Event Player));
		Event Player.O = 1;
	}
}

rule("HUD | Multiclimbs Used")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.J == 2;
		Has Spawned(Event Player) == True;
	}

	actions
	{
		Destroy HUD Text(Event Player.paqiang);
		Create HUD Text(Event Player, Custom String("Climb{0}", Event Player.climbNum > 0 ? Custom String("({0})", Event Player.climbNum)
			: Custom String("")), Null, Null, Left, 2, Color(Green), Null, Null, Visible To and String, Default Visibility);
		Event Player.paqiang = Last Text ID;
	}
}

rule("HUD | Wallclimb Used")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.J == 1;
		Has Spawned(Event Player) == True;
	}

	actions
	{
		Destroy HUD Text(Event Player.paqiang);
		Create HUD Text(Event Player, Custom String("Climb"), Null, Null, Left, 2, Color(Red), Null, Null, Visible To and String,
			Default Visibility);
		Event Player.paqiang = Last Text ID;
	}
}

rule("HUD | Multiclimb Counter")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is On Wall(Event Player) == True;
		Is Button Held(Event Player, Button(Jump)) == False;
		Event Player.J == 2;
	}

	actions
	{
		"@Condition eventPlayer.InvincibleToggle == 0"
		Event Player.climbNum += 1;
	}
}

rule("HUD | Bhop")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Has Spawned(Event Player) == True;
	}

	actions
	{
		Wait(1, Ignore Condition);
		Create HUD Text(Event Player, Custom String("Bhop"), Null, Null, Left, 1, Event Player.O == 0 ? Color(Green) : Event Player.CH,
			Null, Null, Color, Default Visibility);
	}
}

rule("HUD | Bhop Indicator | Unused | Green")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is On Ground(Event Player) == True;
		Is Button Held(Event Player, Button(Jump)) == False;
	}

	actions
	{
		Event Player.CH = Color(Green);
	}
}

rule("HUD | Bhop Indicator | Used | Red")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Jumping(Event Player) == True;
	}

	actions
	{
		Event Player.CH = Color(Red);
	}
}

disabled rule("-------------------------------------------------------------------------- Bans --------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Ban | Wallclimb for specific CPs <---- EDIT ME")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Workshop Setting Toggle(Custom String("Ban Switch"), Custom String("Ban Wallclimb for specific CPs"), False, 2) == True;
		Event Player.C == 0;
		Event Player.A < Count Of(Global.A) - 1;
		"Change \"-1\" to certain Checkpoints' number"
		Array Contains(Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1), Event Player.A) == True;
		"If all checkpoints need this function, enable this rule and disable Rule: \"Array Contains\" \r\n@Condition eventPlayer.A < len(A) - 1"
		Distance Between(Event Player, Global.A[Event Player.A + 1]) <= 2;
	}

	actions
	{
		If(Event Player.J == 1);
			Call Subroutine(checkpointFailReset);
			Small Message(Event Player, Custom String("Climb is banned!"));
	}
}

rule("Ban | Bhop for specific CPs      <---- EDIT ME")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Workshop Setting Toggle(Custom String("Ban Switch"), Custom String("Ban Bhop for specific CPs"), False, 3) == True;
		Event Player.C == 0;
		Event Player.A < Count Of(Global.A) - 1;
		"Change \"-1\" to certain Checkpoints' number"
		Array Contains(Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1), Event Player.A) == True;
		"If all checkpoints need this function, enable this rule and disable Rule: \"Array Contains\" \r\n@Condition eventPlayer.A < len(A) - 1"
		Distance Between(Event Player, Global.A[Event Player.A + 1]) <= 2;
	}

	actions
	{
		If(Event Player.O == 1);
			Call Subroutine(checkpointFailReset);
			Small Message(Event Player, Custom String("Bhop is banned!"));
	}
}

rule("Ban | Triple Jump")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Workshop Setting Toggle(Custom String("Ban Switch"), Custom String("Ban Triple Jump"), False, 0) == True;
		Event Player.C == 0;
		Event Player.A < Count Of(Global.A) - 1;
		Vertical Speed Of(Event Player) >= 5.800;
		Event Player.TY == 1;
		Is Using Ability 1(Event Player) == False;
	}

	actions
	{
		Abort If(Is On Wall(Event Player));
		Small Message(Event Player, Custom String("Triple Jump is banned!"));
		Call Subroutine(checkpointFailReset);
	}
}

rule("Ban | Multiclimb")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Workshop Setting Toggle(Custom String("Ban Switch"), Custom String("Ban Multiclimb"), False, 1) == True;
		Event Player.C == 0;
		Event Player.A < Count Of(Global.A) - 1;
		Event Player.climbNum > 0;
	}

	actions
	{
		"@Condition eventPlayer.isHoldingButton(Button.JUMP) == false\r\n @Condition eventPlayer.WallclimbUsed == 2\r\n eventPlayer.applyImpulse(Vector.DOWN, eventPlayer.getSpeed(), Relativity.TO_PLAYER, Impulse.CANCEL_CONTRARY_MOTION)"
		Small Message(Event Player, Custom String("Multiclimb is banned!"));
		Call Subroutine(checkpointFailReset);
	}
}

rule("Ban | Emote Savehop")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Workshop Setting Toggle(Custom String("Ban Switch"), Custom String("Ban Emote Savehop"), False, 3) == True;
		Event Player.C == 0;
		Event Player.A < Count Of(Global.A) - 1;
		Is Communicating Any Emote(Event Player) == True;
	}

	actions
	{
		Small Message(Event Player, Custom String("Emote Savehop is banned!"));
		Call Subroutine(checkpointFailReset);
	}
}

rule("Ban | Create Bhop")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Workshop Setting Toggle(Custom String("Ban Switch"), Custom String("Ban Create Bhop"), False, 2) == True;
	}

	actions
	{
		Global.kaxiaotiao = True;
	}
}

rule("Ban | Deathbhop")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Workshop Setting Toggle(Custom String("Ban Switch"), Custom String("Ban Deathbhop"), False, 4) == True;
	}

	actions
	{
		Global.deathjump = True;
	}
}

rule("Ban | Dash Start")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Workshop Setting Toggle(Custom String("Ban Switch"), Custom String("Ban Dash Start"), False, 4) == True;
	}

	actions
	{
		Global.DashExploitToggle = True;
	}
}

disabled rule("------------------------------------------------------------------------ Addons  ------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

disabled rule("Add Blade to Checkpoint <---- EDIT ME")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"Change \"-1\" to certain Checkpoints' number. For example if you want to add Blade to Checkpoint 2 and 6 change one of \"-1\" to 2 and other \"-1\" to 6"
		Global.Dao = Array(Empty Array, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
	}
}

disabled rule("Add Dash to Checkpoint <---- EDIT ME")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"Change \"-1\" to certain Checkpoints' number. For example if you want to add Dash to Checkpoint 7 and 1 change one of \"-1\" to 7 and other \"-1\" to 1"
		Wait(1, Ignore Condition);
		Global.SHIFT = Array(Empty Array, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
	}
}

disabled rule("In world text for certain Checkpoints <---- EDIT ME")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Create In-World Text(
			Filtered Array(All Players(All Teams), Current Array Element.A == 31), Custom String("hint: text here"), 
			Vector(0,0,0), 1.200, Clip Against Surfaces, Visible To Position and String, Color(Aqua), Default Visibility
		);
	}
}

disabled rule("HUD text for certain Checkpoints <---- EDIT ME")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.A == 0), Custom String("Text for checkpoint 0"), Null,
			Null, Top, -4, Color(Red), Null, Null, Visible To and String, Default Visibility);
		Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.A == 1), Custom String("Text for checkpoint 1"), Null,
			Null, Top, -4, Color(Red), Null, Null, Visible To and String, Default Visibility);
		Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.A == 2), Custom String("Text for checkpoint 2"), Null,
			Null, Top, -4, Color(Red), Null, Null, Visible To and String, Default Visibility);
	}
}

rule("pre-set control map portal - placement - toggled via workshop")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Global.PortalOn != False;
	}

	actions
	{
		"overwrite pasta"
		Wait(2, Abort When False);
		If(Current Map == Map(Busan));
			"\"down > sanc\",\"down > meka\",\"sanc > down\",\"sanc > meka\",\"meka > sanc\",\"meka > down\""
			Global.PortalNames = Array(Custom String("Sanctuary"), Custom String("MEKA base"), Custom String("Downtown"), Custom String(
				"MEKA base"), Custom String("Sanctuary"), Custom String("Downtown"));
			Global.PortalLoc = Array(Vector(47.946, 7.248, -93.922), Vector(55.921, 6.998, -94.024), Vector(-326.382, 10.810, 117.261), Vector(
				-330.960, 10.810, 117.416), Vector(219.567, 10.215, 243.653), Vector(225.976, 10.227, 240.799));
			Global.PortalDest = Array(Vector(-328.552, 10.010, 120.820), Vector(221.152, 9.376, 238.765), Vector(52.197, 6.301, -97.513),
				Vector(221.271, 9.431, 238.978), Vector(-328.601, 10.010, 120.823), Vector(52.197, 6.299, -97.513));
		Else If(Current Map == Map(Ilios));
			"\"light > ruin\",\"light > well\",\"ruin > light\",\"ruin > well\",\"well > light\",\"well > ruin\""
			Global.PortalNames = Array(Custom String("Ruins"), Custom String("Well"), Custom String("Lighthouse"), Custom String("Well"),
				Custom String("Lighthouse"), Custom String("Ruins"));
			Global.PortalLoc = Array(Vector(325.722, -22.665, -40.401), Vector(327.430, -22.665, -36.089), Vector(26.176, 58.367, -156.415),
				Vector(30.472, 58.367, -156.307), Vector(-199.945, 2.015, -2.918), Vector(-194.930, 2.015, -8.054));
			Global.PortalDest = Array(Vector(28.375, 57.659, -161.195), Vector(-200.464, 1.306, -8.604), Vector(333.088, -23.389, -40.933),
				Vector(-200.464, 1.306, -8.604), Vector(333.088, -23.389, -40.933), Vector(28.375, 57.829, -161.195));
		Else If(Current Map == Map(Lijiang Tower) || Current Map == Map(Lijiang Tower Lunar New Year));
			"\"control > ***den\",\"control > market\",\"***den > control\",\"***den > market\",\"market > control\",\"market > ***den\""
			Global.PortalNames = Array(Custom String("***den"), Custom String("Night Market"), Custom String("Control Center"), Custom String(
				"Night Market"), Custom String("Control Center"), Custom String("***den"));
			Global.PortalLoc = Array(Vector(-2.815, 271, 295.373), Vector(2.905, 271, 295.052), Vector(5.788, 95.056, 135.298), Vector(-5.343,
				95.050, 134.638), Vector(-2.738, 0, -61.911), Vector(5.043, 0, -61.879));
			Global.PortalDest = Array(Vector(0.286, 94.292, 140.396), Vector(0.584, -0.709, -54.469), Vector(0.245, 270.292, 301.428), Vector(
				0.773, -0.708, -54.361), Vector(0.245, 270.292, 301.428), Vector(0.286, 94.292, 140.396));
		Else If(Current Map == Map(Nepal));
			"\"vil > shrine\",\"vil > sanc\", \"shrine > vil\",\"shrine > sanc\",#\"sanc > vil\",\"sanc > shrine\""
			Global.PortalNames = Array(Custom String("Shrine"), Custom String("Sanctum"), Custom String("Village"), Custom String("Sanctum"),
				Custom String("Village"), Custom String("Shrine"));
			Global.PortalLoc = Array(Vector(-194.732, -92.860, -3.802), Vector(-194.585, -92.860, 4.187), Vector(-33.165, 14, 5.212), Vector(
				-33.058, 14, -5.550), Vector(84.750, 129.008, -3.624), Vector(84.534, 129, 4.032));
			Global.PortalDest = Array(Vector(-40.190, 13.292, -0.105), Vector(78.430, 128.292, 0.149), Vector(-190.540, -93.569, 0.122),
				Vector(78.430, 128.292, 0.149), Vector(-190.540, -93.569, 0.122), Vector(-40.190, 13.292, -0.105));
		Else If(Current Map == Map(Oasis));
			"\"uni > ***den\",\"uni > city\",\"***den > uni\",\"***den > city\",\"city > ***den\",\"city > uni\""
			Global.PortalNames = Array(Custom String("***dens"), Custom String("City Center"), Custom String("University"), Custom String(
				"City Center"), Custom String("***dens"), Custom String("University"));
			Global.PortalLoc = Array(Vector(-211.137, 20, -5.084), Vector(-211.346, 20, 5.029), Vector(143.061, 8.377, -245.040), Vector(
				139.333, 8.377, -249.964), Vector(157.297, 12.522, 255.759), Vector(151.452, 12.522, 261.099));
			Global.PortalDest = Array(Vector(134.366, 7.829, -240.530), Vector(158.270, 11.814, 262.272), Vector(-206.269, 19.292, 0.103),
				Vector(158.283, 11.814, 262.283), Vector(134.318, 7.829, -240.667), Vector(-206.269, 19.292, 0.103));
		Else;
			Global.PortalDest = Null;
			Abort;
	}
}

rule("pre-set control map portal - function - toggled via workshop")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Global.PortalOn != False;
		Count Of(Global.PortalLoc) != Null;
		(Event Player.C || Event Player.A == Count Of(Global.A) - 1) == True;
		Is True For Any(Global.PortalLoc, Distance Between(Position Of(Event Player) + Vector(0, 0.200, 0), Current Array Element) < 1.400)
			== True;
	}

	actions
	{
		If(Global.PortalDest[Index Of Array Value(Global.PortalLoc, First Of(Sorted Array(Global.PortalLoc, Distance Between(Event Player,
			Current Array Element))))] != Vector(0, 0, 0));
			Teleport(Event Player, Global.PortalDest[Index Of Array Value(Global.PortalLoc, First Of(Sorted Array(Global.PortalLoc,
				Distance Between(Event Player, Current Array Element))))]);
	}
}

disabled rule("custom portals - data <---- EDIT ME")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"Portal start position"
		Global.CustomPortalStart = Array(Vector(0,0,0));
		
		"Portal end position (on same number as start position)"
		Global.CustomPortalEndpoint = Array(Vector(0,1,0));
		
		"Portal checkpoint (on same number as start position) \r\n999 = apply portal to entire map"
		Global.CustomPortalCP = Array(0);
	}
}


disabled rule("custom portals - function")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Count Of(Global.CustomPortalStart) > 0;
		Is True For Any(Global.CustomPortalStart, Distance Between(Position Of(Event Player) + Vector(0, 0.200, 0), Current Array Element)
			< 1.100 && Array Contains(Array(999, Event Player.A), Global.CustomPortalCP[Current Array Index])) == True;
	}

	actions
	{
		Event Player.PortalLoop = 0;
		For Player Variable(Event Player, PortalLoop, 0, Count Of(Global.CustomPortalStart), 1);
			If(Distance Between(Position Of(Event Player) + Vector(0, 0.200, 0), Global.CustomPortalStart[Event Player.PortalLoop])
				< 1.100 && Array Contains(Array(999, Event Player.A), Global.CustomPortalCP[Event Player.PortalLoop]));
				Teleport(Event Player, Global.CustomPortalEndpoint[Event Player.PortalLoop]);
				Abort;
			End;
		End;
		Wait(1, Ignore Condition);
	}
}

`
}