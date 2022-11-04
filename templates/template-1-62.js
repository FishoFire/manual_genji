
function setdata(){ //String.raw
    data_pasta = String.raw`settings
{
	main
	{
		Description: "  ~ The Official Genji Parkour Editor ~\nCode: 54CRY\nAdapted by: nebula#11571/FishoFire#2431"
		Mode Name: "Genji Parkour v1.0.6"
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
variables {
    global:
        0: A
        1: B
        2: C
        3: MsDestructo
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
        33: LeaderBoardHuds
        34: LeaderBoardRemake
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
        50: CompMode
        51: CompTime
        52: CompAtmpNum
        53: CompAtmpSaveNames
        54: CompAtmpSaveCount
        55: CompRestartLimit
        56: instructiontext
        57: TitleData
    player:
        0: A
        1: B
        2: C
        3: D
        4: E
        5: F
        6: ArrayIterator
        7: H
        8: MapVectorArray
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
        49: BounceLockMax_Cache
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
        65: CompDone
        66: AttemptCount
        67: instructionhud
        68: TitleStore
        85: CH
}
subroutines {
    0: Sub0
    1: Sub1
    2: Leaderboardupdate
    3: KILLBALL
    4: pinball
    5: BuildPortals
    6: CreateLeaderBoard
    7: UpdateTitle
    8: RebuildBounceOrbs
    9: RebuildKillOrbs
    10: UpdateCache
    11: checkpointFailReset
}
disabled rule ("------------------------------------------------------------------------ Map pasta ------------------------------------------------------------------------ ") {
    event {
        Ongoing - Global;
    }
}

rule ("Map Data     <---- INSERT YOUR MAP DATA HERE") {
    event {
        Ongoing - Global;
    }
    actions
	{
		
		"======= Checkpoint data ==========================
		Checkpoints positions - Vector(123.456,123.456,123.456) - The order is the checkpoint number.  The first Vector here is checkpoint 0"
		${data_cps}

		"======= killballs ==========================
		Killball level number - Number 123 - Number of the checkpoint (in position array starting count with 0)"
		${data_kill_cp}
		
		"killball positions - Vector(123.456,123.456,123.456)"
		${data_kill_pos}

		"killball radius - Vector(123.456,123.456,123.456)"
		${data_kill_rad}
		
		"======= orbs ==========================
		orb checkpoint number - Number 123 - Number of the checkpoint (in position array starting count with 0)"
		${data_orb_cp}
		
		"orb position - Vector(123.456,123.456,123.456)"
		${data_orb_pos}
		
		"orb bounce strength - Number 123.456 - default bounce is 10 - 0 means dont bounce"
		${data_orb_strength}
		
		"orb gives ult - True or False"
		${data_orb_ult}
		
		"orb gives dash - True or False"
		${data_orb_dash}
		
		"orb locks checkpoint - True or False"
		${data_orb_lock}
		
		"======= others - DONT CHANGE =========================="	
		Global.TimeRemaining = 263;
		Global.LeaderBoardFull = Empty Array;
		Global.Difficultyhud = 2;

	}
}

rule ("Credits here <---- INSERT YOUR NAME HERE") {
    event {
        Ongoing - Global;
    }
    actions {
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("made by: ${mapmaker}", Null, Null, Null), Left, -15, Null, Null, Color(Violet), Visible To, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("map code: ${mapcode}", Null, Null, Null), Left, -14, Null, Null, Color(Sky Blue), Visible To, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("Discord: dsc.gg/genjiparkour", Null, Null, Null), Left, -13, Null, Null, Color(Aqua), Visible To, Default Visibility);
    }
}

disabled rule ("Custom difficulty hud") {
    event {
        Ongoing - Global;
    }
    actions {
        "1) workshop settings > difficulty > set to \"dont display\"\r\n2) enable this rule\r\n3) type your difficulty in the hud below"
        Create HUD Text(All Players(All Teams), Null, Custom String("Difficulty: custom", Null, Null, Null), Null, Top, -24, Null, Color(Green), Null, Visible To, Default Visibility);
    }
}

disabled rule ("Display World Record") {
    event {
        Ongoing - Global;
    }
    actions {
        "1) enable this rule\r\n2) type your entry in the textfield that says \"name and time here\""
        Create HUD Text(If-Then-Else((Host Player).EditorOn, Null, All Players(All Teams)), Null, Custom String(" \n{0} world record {0}", Icon String(Fire), Null, Null), Custom String("name and time here", Null, Null, Null), Right, -1, Color(Rose), Color(Rose), Color(Rose), Visible To, Default Visibility);
    }
}

rule ("Friend Title <----  DISPLAY MESSAGE HERE (ON PLAYER)") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Has Spawned(Event Player) == True;
    }
    actions {
        "In the field custom string your nickname"
        If(Compare(Custom String("your nickname <-------", Null, Null, Null), ==, Custom String("{0}", Event Player, Null, Null)));
            Big Message(All Players(All Teams), Custom String("Message to the whole room", Null, Null, Null));
            Create In-World Text(All Players(All Teams), Custom String("Title <---------------The inscription that will be displayed on you", Null, Null, Null), Event Player, 1.5, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
        End;
        "Fill in the blank with your friend's name"
        If(Compare(Custom String("your nickname <-------", Null, Null, Null), ==, Custom String("{0}", Event Player, Null, Null)));
            Big Message(All Players(All Teams), Custom String("Message to the whole room", Null, Null, Null));
            Create In-World Text(All Players(All Teams), Custom String("Title <---------------The inscription that will be displayed on you", Null, Null, Null), Event Player, 1.5, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
    }
}

rule ("Comp Mode instruction message") {
    event {
        Ongoing - Global;
    }
    actions {
        "There is a limit to how much text a hud can have. For this reason 4 huds are available. Spread message over the 4 huds. Empty them if they are not needed."
        Set Global Variable At Index(instructiontext, 0, Custom String("${compdescription[0]}", Null, Null, Null));
        Set Global Variable At Index(instructiontext, 1, Custom String("${compdescription[1]}", Null, Null, Null));
        Set Global Variable At Index(instructiontext, 2, Custom String("${compdescription[2]}", Null, Null, Null));
        Set Global Variable At Index(instructiontext, 3, Custom String("${compdescription[3]}", Null, Null, Null));
    }
}

rule ("SUB | Rebuild Bounce Orbs") {
    event {
        Subroutine;
        RebuildBounceOrbs;
    }
    actions {
        Destroy Effect(Global.TQ2);
        Set Global Variable(TQ2, Empty Array);
        For Global Variable(NANBA, 0, Count Of(Global.pinballnumber), 1);
            Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null), And(Compare((Current Array Element).A, ==, Value In Array(Global.pinballnumber, Evaluate Once(Global.NANBA))), Not(Array Contains((Current Array Element).LockCollected, Evaluate Once(Value In Array(Global.TQ, Evaluate Once(Global.NANBA))))))), Orb, If-Then-Else(Value In Array(Global.BounceToggleLock, Evaluate Once(Global.NANBA)), Color(Orange), Color(Green)), Value In Array(Global.TQ, Evaluate Once(Global.NANBA)), 1, Visible To Position Radius and Color);
            Modify Global Variable(TQ2, Append To Array, Last Created Entity);
            Wait(0.016, Ignore Condition);
        End;
    }
}

rule ("SUB | Rebuild Kill Orbs") {
    event {
        Subroutine;
        RebuildKillOrbs;
    }
    actions {
        Destroy Effect(Global.K);
        Set Global Variable(K, Empty Array);
        For Global Variable(NANBA, 0, Count Of(Global.killballnumber), 1);
            Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null), Compare((Current Array Element).A, ==, Value In Array(Global.killballnumber, Evaluate Once(Global.NANBA)))), Sphere, Color(Blue), Value In Array(Global.H, Evaluate Once(Global.NANBA)), Value In Array(Global.I, Evaluate Once(Global.NANBA)), Visible To Position and Radius);
            Modify Global Variable(K, Append To Array, Last Created Entity);
            Wait(0.016, Ignore Condition);
        End;
    }
}

rule ("SUB | Rebuild Portals") {
    event {
        Subroutine;
        BuildPortals;
    }
    actions {
        "custom portals"
        If(Global.CustomPortalStart);
            For Global Variable(NANBA, 0, Count Of(Global.CustomPortalStart), 1);
                Create Effect(Filtered Array(All Players(All Teams), Or(Compare((Current Array Element).A, ==, Value In Array(Global.CustomPortalCP, Evaluate Once(Global.NANBA))), Compare(Value In Array(Global.CustomPortalCP, Evaluate Once(Global.NANBA)), ==, 999))), Good Aura, Color(White), Value In Array(Global.CustomPortalStart, Evaluate Once(Global.NANBA)), 0.6, Visible To);
                Wait(0.16, Ignore Condition);
            End;
        End;
        "pre-set portals"
        If(Global.PortalDest);
            For Global Variable(NANBA, 0, Count Of(Global.PortalLoc), 1);
                Create Effect(Filtered Array(All Players(All Teams), Or((Current Array Element).C, Compare((Current Array Element).A, ==, Subtract(Count Of(Global.A), 1)))), Bad Aura, If-Then-Else(Compare(Modulo(Evaluate Once(Global.NANBA), 2), ==, 1), Color(Aqua), Color(Orange)), Value In Array(Global.PortalLoc, Evaluate Once(Global.NANBA)), 0.6, Visible To);
                Create In-World Text(Filtered Array(All Players(All Teams), Or((Current Array Element).C, Compare((Current Array Element).A, ==, Subtract(Count Of(Global.A), 1)))), Custom String("{0}", Value In Array(Global.PortalNames, Evaluate Once(Global.NANBA)), Null, Null), Add(Value In Array(Global.PortalLoc, Evaluate Once(Global.NANBA)), Vector(0, 1, 0)), 1, Clip Against Surfaces, Visible To, Color(White), Default Visibility);
            End;
        End;
    }
}

rule ("SUB | Update Effect Cache") {
    event {
        Subroutine;
        UpdateCache;
    }
    actions {
        Set Player Variable(Event Player, BouncePosition_Cache, Filtered Array(Global.TQ, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceStrength_Cache, Filtered Array(Global.EditMode, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceUlt_Cache, Filtered Array(Global.TQ5, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceDash_Cache, Filtered Array(Global.TQ6, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceLock_Cache, Filtered Array(Global.BounceToggleLock, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, KillPosition_Cache, Filtered Array(Global.H, Compare(Value In Array(Global.killballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, KillRadii_Cache, Filtered Array(Global.I, Compare(Value In Array(Global.killballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceLockMax_Cache, Count Of(Filtered Array((Event Player).BounceLock_Cache, Current Array Element)));
        Abort If(Not((Host Player).EditorOn));
        Destroy Effect((Event Player).EffectSizeArray);
        Set Player Variable(Event Player, EffectSizeArray, Empty Array);
        Create Effect(If-Then-Else((Event Player).EffectSizeToggle, Event Player, Null), Sphere, Color(White), Value In Array(Global.A, (Event Player).A), 1.4, Visible To Position and Radius);
        Modify Player Variable(Event Player, EffectSizeArray, Append To Array, Last Created Entity);
        Create Effect(If-Then-Else(And((Event Player).EffectSizeToggle, Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1))), Event Player, Null), Sphere, Color(White), Value In Array(Global.A, Add((Event Player).A, 1)), 1.4, Visible To Position and Radius);
        Modify Player Variable(Event Player, EffectSizeArray, Append To Array, Last Created Entity);
        Set Player Variable(Event Player, BounceIndex_Cache, Filtered Array(Mapped Array(Global.pinballnumber, If-Then-Else(Compare(Current Array Element, ==, (Event Player).A), Current Array Index, -1)), Compare(Current Array Element, >=, 0)));
        Set Player Variable(Event Player, KillIndex_Cache, Filtered Array(Mapped Array(Global.killballnumber, If-Then-Else(Compare(Current Array Element, ==, (Event Player).A), Current Array Index, -1)), Compare(Current Array Element, >=, 0)));
        If(And((Event Player).MovedCheckpoint, Compare(Event Player, ==, Host Player)));
            Set Global Variable(B, (Event Player).A);
            Set Global Variable(J, If-Then-Else((Event Player).KillIndex_Cache, 0, 99999));
            Set Global Variable(L, If-Then-Else(Count Of((Event Player).KillIndex_Cache), Value In Array(Global.H, Value In Array((Event Player).KillIndex_Cache, Global.J)), Vector(0, 0, 0)));
            Set Global Variable(TQ1, If-Then-Else((Event Player).BounceIndex_Cache, 0, 99999));
            Set Global Variable(TQ3, If-Then-Else(Count Of((Event Player).BounceIndex_Cache), Value In Array(Global.TQ, Value In Array((Event Player).BounceIndex_Cache, Global.TQ1)), Vector(0, 0, 0)));
            Set Player Variable(Event Player, MovedCheckpoint, False);
        End;
    }
}

disabled rule ("------------------------------------------------------------------------  Editor ------------------------------------------------------------------------") {
    event {
        Ongoing - Global;
    }
}

rule ("HUD | Clear Excess Data & Save Map") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Melee)) == True;
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Reload)) == True;
        Event Player == Host Player;
    }
    actions {
        Wait(0.5, Abort When False);
        Set Global Variable(B, 0);
        Set Global Variable(C, 0);
        "Portal1PlayerList = 0\r\nPortal2PlayerList = 0"
        Set Global Variable(J, 0);
        Set Global Variable(K, 0);
        Set Global Variable(L, 0);
        Set Global Variable(Dao, 0);
        Set Global Variable(SHIFT, 0);
        Set Global Variable(P, 0);
        Set Global Variable(TQ1, 0);
        Set Global Variable(NANBA, 0);
        Set Global Variable(TQ2, 0);
        Set Global Variable(TQ3, 0);
        Set Global Variable(save, 0);
        Set Global Variable(LeaderBoardFull, Empty Array);
        Set Global Variable(PortalOn, False);
        Enable Inspector Recording;
        Create HUD Text(Event Player, Custom String("　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   0. clear excess data:\n Automatically done when opening this window\n\n   1. Copy da{0}", Custom String("ta:\n Open Workshop Inspector → Set variable target as global\n click the [x]\n\n   2. Insert data:\n Paste the data in the rul{0}", Custom String("e named 'map data pasta' (first rule)\n\n   3. Workshop settings:\n ESC→SHOW LOBBY→SETTINGS→ workshop settings →\n toggle 'Edi{0}", Custom String("tor mode' off\n Select display difficulty\n", Null, Null, Null), Null, Null), Null, Null), Null, Null), Null, Null, Top, -99, Color(Lime Green), Null, Null, None, Default Visibility);
        Set Player Variable At Index(Event Player, savemaphud, 0, Last Text ID);
        Create HUD Text(Event Player, Custom String("　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   4. Create initial sharecode:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n CREATE NEW COD{0}", Custom String("E→COPY CODE\n\n   5. Add credits:\n Enter your name & map code in the 'Credits here' rule\n (second rule) \n\n   6. Update for c{0}", Custom String("redits:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n UPLOAD TO EXISTING CODE→ PASTE THE CODE YOU CREATED IN STEP 4\n", Null, Null, Null), Null, Null), Null, Null), Null, Null, Top, -98, Color(Lime Green), Null, Null, None, Default Visibility);
        Set Player Variable At Index(Event Player, savemaphud, 1, Last Text ID);
        Create HUD Text(Event Player, Custom String("    > Press Interact to close this window <    ", Null, Null, Null), Null, Null, Top, -97, Color(Lime Green), Null, Null, None, Default Visibility);
        Set Player Variable At Index(Event Player, savemaphud, 2, Last Text ID);
        Wait Until(Not(Is Button Held(Event Player, Button(Interact))), 9999);
        Wait Until(Is Button Held(Event Player, Button(Interact)), 9999);
        Destroy HUD Text(First Of((Event Player).savemaphud));
        Destroy HUD Text(Value In Array((Event Player).savemaphud, 1));
        Destroy HUD Text(Value In Array((Event Player).savemaphud, 2));
    }
}

rule ("HUD | Show/Hide Guide | Hold Melee") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Melee)) == True;
        Is Button Held(Event Player, Button(Interact)) == False;
        Is Button Held(Event Player, Button(Reload)) == False;
        Event Player == Host Player;
        (Event Player).E >= 1;
    }
    actions {
        Wait(0.8, Abort When False);
        Abort If(Or(Is Button Held(Event Player, Button(Interact)), Is Button Held(Event Player, Button(Reload))));
        Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
        If(Compare((Event Player).K, ==, 1));
            Set Player Variable(Event Player, K, 2);
            Small Message(Event Player, Custom String("   Guide is hidden", Null, Null, Null));
        Else;
            Set Player Variable(Event Player, K, 1);
            Small Message(Event Player, Custom String("   Guide is open", Null, Null, Null));
    }
}

rule ("HUD | Show Guide On Spawn") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Has Spawned(Event Player) == True;
    }
    actions {
        Set Player Variable(Event Player, E, 1);
        Set Player Variable(Event Player, K, 1);
    }
}

rule ("HUD | Guide") {
    event {
        Ongoing - Global;
    }
    actions {
        "@Condition hostPlayer.EditorOn\r\n condition messes up if host player leaves"
        Wait Until(Has Spawned(Host Player), 90);
        Wait(5, Ignore Condition);
        Abort If(Not((Host Player).EditorOn));
        Create HUD Text(If-Then-Else(Compare((Host Player).K, ==, 1), Host Player, Null), Null, Null, Custom String(" \n{0}", Value In Array(Array(Custom String("{0} + {1} | Create New Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Delete selected Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Add teleport to Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Reload)), Custom String("{0} + {1} | Set Checkpoint to current position\n{0} + {2} | Toggle Checkpoint Hitbox", Input Binding String(Button(Interact)), Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 1)))))), Custom String("{0} + {1} | Create new kill orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Select next orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Increase orb size\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb size\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Move orb forward\n{0} + {2} | Move orb Backward", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire))))))))), Custom String("{0} + {1} | Create new Bounce orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Select next orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Increase orb strength\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb strength\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Move orb forward\n{0} + {2} | Move orb back", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire)))))))))), Subtract((Host Player).E, 1)), Null, Null), Right, 10, Null, Null, Color(Yellow), Visible To and String, Default Visibility);
        Create HUD Text(Host Player, Null, Null, If-Then-Else(Compare((Host Player).K, ==, 1), Custom String(" \n{0} + {1} | Next checkpoint\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Prev checkpoint\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)), Custom String("{0} | Fly (checkpoint mode only)\nHold {1} | toggle guide\n", Input Binding String(Button(Ability 2)), Input Binding String(Button(Melee)), Null))), Custom String("Hold {0} | toggle guide", Input Binding String(Button(Melee)), Null, Null)), Right, 11, Null, Null, If-Then-Else(Compare((Host Player).K, ==, 1), Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else(Compare((Host Player).K, ==, 1), Host Player, Null), Null, Null, Custom String("save map: hold {0} + {1} + {2} and follow instructions", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)), Input Binding String(Button(Reload))), Left, -12, Null, Null, Color(Yellow), Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), If-Then-Else(Compare(Local Player, ==, Host Player), Custom String("Current mode: {0}", Value In Array(Array(Custom String("Checkpoints", Null, Null, Null), Custom String("Kill Orb", Null, Null, Null), Custom String("Bounce Orb", Null, Null, Null)), Subtract((Host Player).E, 1)), Null, Null), Custom String("Current editor/host: {0}", Host Player, Null, Null)), Null, Null, Right, -60, Color(Red), Color(Red), Color(Red), Visible To and String, Default Visibility);
        Create HUD Text(Host Player, Null, Null, Custom String("Hold {0} to change mode\n", Input Binding String(Button(Ability 1)), Null, Null), Right, -59, Color(Red), Color(Red), Color(Red), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else(Compare((Host Player).E, ==, 3), Host Player, Null), Null, Null, Custom String("{0} + {1} | orb give ultimate | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Primary Fire)), If-Then-Else(Compare(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null))), Top, -18, Null, Null, If-Then-Else(Compare(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else(Compare((Host Player).E, ==, 3), Host Player, Null), Null, Null, Custom String("{0} + {1} | orb gives dash | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Secondary Fire)), If-Then-Else(Compare(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null))), Top, -17, Null, Null, If-Then-Else(Compare(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else(Compare((Host Player).E, ==, 3), Host Player, Null), Null, Null, Custom String("{0} + {1} | orb unlocks checkpoint | {2}\n", Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 2)), If-Then-Else(Compare(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null))), Top, -16, Null, Null, If-Then-Else(Compare(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else(Compare((Host Player).K, ==, 1), Host Player, Null), Custom String("{0}", If-Then-Else(Compare((Host Player).E, ==, 1), Custom String(" Selected Checkpoint \n Vector: {0}{1} ", Value In Array(Global.A, Global.B), If-Then-Else(Compare(Count Of(Value In Array(Global.A, Global.B)), <, 2), Custom String("", Null, Null, Null), Custom String("\nTeleport:{0}", Value In Array(Value In Array(Global.A, Global.B), 1), Null, Null)), Null), If-Then-Else(Compare((Host Player).E, ==, 2), Custom String(" Selected Kill Orb \n Vector: {0} \n radius: {1} ", Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)), Value In Array(Global.I, Value In Array((Host Player).KillIndex_Cache, Global.J)), Null), If-Then-Else(Compare((Host Player).E, ==, 3), Custom String(" Selected Bounce Orb \n Vector: {0} \n strength: {1} \n Lock: {2}", Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Value In Array(Global.EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Custom String("{0} \n Dash: {1} \n Ult: {2} ", Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)))), Custom String("", Null, Null, Null)))), Null, Null), Null, Null, Left, 50, Color(White), Color(Orange), Color(Orange), Visible To and String, Default Visibility);
        "original without vector display\r\n orb limit count"
        Create HUD Text(If-Then-Else(Compare((Host Player).K, ==, 1), Host Player, Null), Custom String("orb/portal limit: {0}/{1}", Add(Add(Count Of(Global.TQ), Count Of(Global.H)), Count Of(Global.CustomPortalStart)), 193, Null), Null, Null, Top, -20, Color(Red), Color(Orange), Color(Orange), Visible To and String, Default Visibility);
    }
}

rule ("HUD | Guide Effects") {
    event {
        Ongoing - Global;
    }
    actions {
        "@Condition hostPlayer.EditorOn"
        Wait Until(Has Spawned(Host Player), 90);
        Wait(5, Ignore Condition);
        Abort If(Not((Host Player).EditorOn));
        "##createEffect(getAllPlayers(), Effect.SPHERE, Color.RED, H[J], I[J], EffectReeval.VISIBILITY_POSITION_AND_RADIUS)\r\n Purple bounce selectino aura"
        Create Effect(If-Then-Else(And(Compare(Global.B, !=, -1), (Host Player).BouncePosition_Cache), All Players(All Teams), Null), Good Aura, Color(Purple), Global.TQ3, 1, Visible To Position and Radius);
        "Don't open it easily, the action will be too long\r\n Selected kill orb text"
        Create In-World Text(If-Then-Else(And(Compare(Global.B, !=, -1), (Host Player).KillPosition_Cache), All Players(All Teams), Null), Custom String("Selected Kill Orb", Null, Null, Null), Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)), 1.6, Do Not Clip, Visible To Position and String, Color(Sky Blue), Default Visibility);
        "Red distance orb for kill orb"
        Create Effect(If-Then-Else(And(Compare(Global.B, !=, -1), (Host Player).KillPosition_Cache), All Players(All Teams), Null), Orb, Color(Red), Global.L, 1, Visible To Position and Radius);
        "Distance # text for kill orb"
        Create In-World Text(If-Then-Else(And(Compare(Global.B, !=, -1), (Host Player).KillPosition_Cache), All Players(All Teams), Null), String("{0} m", Distance Between(Host Player, Global.L), Null, Null), Subtract(Global.L, Vector(0, 1.5, 0)), 1.5, Do Not Clip, Visible To Position and String, Color(Red), Default Visibility);
        "Selected kill orb arrow icon"
        Create Icon(If-Then-Else(And(Compare(Global.B, !=, -1), (Host Player).KillPosition_Cache), All Players(All Teams), Null), Add(Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)), Vector(0, 0.6, 0)), Arrow: Down, Visible To and Position, Color(Red), True);
        "Purple sphere for teleport location"
        Create Effect(If-Then-Else(Compare(Count Of(Value In Array(Global.A, Global.B)), >, 1), All Players(All Teams), Null), Sphere, Color(Purple), Subtract(Value In Array(Value In Array(Global.A, Global.B), 1), Vector(0, 0.1, 0)), 0.2, Visible To Position and Radius);
        "Teleport arrow icon"
        Create Icon(If-Then-Else(Compare(Count Of(Value In Array(Global.A, Global.B)), >, 1), All Players(All Teams), Null), Add(Value In Array(Value In Array(Global.A, Global.B), 1), Vector(0, 0.6, 0)), Arrow: Down, Visible To and Position, Color(Purple), True);
        "Teleport text"
        Create In-World Text(If-Then-Else(Compare(Count Of(Value In Array(Global.A, Global.B)), >, 1), All Players(All Teams), Null), Custom String("TELEPORTER EXIT", Null, Null, Null), Value In Array(Value In Array(Global.A, Global.B), 1), 1.6, Do Not Clip, Visible To Position and String, Color(Sky Blue), Default Visibility);
        Wait(1, Ignore Condition);
        If(Global.CompMode);
            Set Global Variable(CompAtmpNum, 0);
            Set Global Variable(CompTime, 99999);
            Set Player Variable(All Players(All Teams), AttemptCount, Null);
            Set Player Variable(All Players(All Teams), CompDone, False);
    }
}

rule ("Fly/Noclip Toggle | Hold Deflect") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        "@Condition eventPlayer.EditModeSelection > 0"
        (Event Player).E == 1;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        "@Condition not eventPlayer.isHoldingButton(Button.JUMP)"
        Is Button Held(Event Player, Button(Crouch)) == False;
        "@Condition not eventPlayer.isHoldingButton(Button.PRIMARY_FIRE)\r\n@Condition not eventPlayer.isHoldingButton(Button.SECONDARY_FIRE)"
        (Event Player).flytoggle == Null;
    }
    actions {
        Wait Until(Or(Not(Is Button Held(Event Player, Button(Ability 2))), And(Is Button Held(Event Player, Button(Crouch)), Is Button Held(Event Player, Button(Interact)))), 1);
        If(And(Is Button Held(Event Player, Button(Crouch)), Is Button Held(Event Player, Button(Interact))));
            Wait(0.016, Ignore Condition);
            Abort;
        End;
        Set Player Variable(Event Player, flytoggle, Add(Position Of(Event Player), Up));
        Start Forcing Player Position(Event Player, (Event Player).flytoggle, True);
        Disable Movement Collision With Environment(Event Player, True);
        While(And(And(Is Alive(Event Player), Compare((Event Player).flytoggle, !=, Null)), Not(Is Button Held(Event Player, Button(Ability 2)))));
            Modify Player Variable(Event Player, flytoggle, Add, Multiply(Facing Direction Of(Event Player), If-Then-Else(Compare(Z Component Of(Throttle Of(Event Player)), >, 0), Add(0.25, Is Button Held(Event Player, Button(Jump))), If-Then-Else(Compare(Z Component Of(Throttle Of(Event Player)), <, 0), Subtract(-0.25, Is Button Held(Event Player, Button(Jump))), 0))));
            Modify Player Variable(Event Player, flytoggle, Add, World Vector Of(Vector(Multiply(X Component Of(Throttle Of(Event Player)), 0.3), 0, 0), Event Player, Rotation));
            Wait(0.016, Ignore Condition);
        End;
        Enable Movement Collision With Environment(Event Player);
        "if eventPlayer.flytoggle != null:"
        Set Player Variable(Event Player, flytoggle, Null);
        Stop Forcing Player Position(Event Player);
        Wait(1, Ignore Condition);
    }
}

rule ("Change Edit Mode | Hold Dash") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Ability 1)) == True;
        Event Player == Host Player;
    }
    actions {
        Wait(1, Abort When False);
        Set Player Variable(Event Player, flytoggle, Null);
        If(Compare((Event Player).E, ==, 1));
            Set Player Variable(Event Player, E, 2);
            Small Message(Host Player, Custom String("   Current mode: Kill Orb", Null, Null, Null));
        Else If(Compare((Event Player).E, ==, 2));
            Set Player Variable(Event Player, E, 3);
            Small Message(Host Player, Custom String("   Current mode: Bounce Orb", Null, Null, Null));
        Else If(Compare((Event Player).E, ==, 3));
            Set Player Variable(Event Player, E, 1);
            Small Message(Host Player, Custom String("   Current mode: Checkpoint", Null, Null, Null));
    }
}

rule ("Bounce Ball | Toggle Ultimate | Ultimate + Primary Fire") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Ultimate)) == True;
        Is Button Held(Event Player, Button(Primary Fire)) == True;
        Event Player == Host Player;
        (Event Player).E == 3;
        Count Of(Global.TQ) != 0;
    }
    actions {
        "1 original"
        Wait(0.24, Ignore Condition);
        If(Compare(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), ==, False));
            Set Global Variable At Index(TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), True);
        Else If(Compare(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), ==, True));
            Set Global Variable At Index(TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), False);
        End;
        Call Subroutine(UpdateCache);
    }
}

rule ("Bounce Ball | Toggle Dash | Ultimate + Secondary Fire") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Secondary Fire)) == True;
        Is Button Held(Event Player, Button(Ultimate)) == True;
        Event Player == Host Player;
        (Event Player).E == 3;
        Count Of(Global.TQ) != 0;
    }
    actions {
        "1 original"
        Wait(0.24, Ignore Condition);
        If(Compare(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), ==, False));
            Set Global Variable At Index(TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), True);
        Else If(Compare(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), ==, True));
            Set Global Variable At Index(TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), False);
        End;
        Call Subroutine(UpdateCache);
    }
}

rule ("Bounce Ball | Toggle Lock | Ultimate + deflect") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        Is Button Held(Event Player, Button(Ultimate)) == True;
        Event Player == Host Player;
        (Event Player).E == 3;
        Count Of(Global.TQ) != 0;
    }
    actions {
        "1 original"
        Wait(0.24, Ignore Condition);
        If(Compare(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), ==, False));
            Set Global Variable At Index(BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), True);
            Set Global Variable At Index(EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), 0);
        Else If(Compare(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), ==, True));
            Set Global Variable At Index(BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), False);
            Set Global Variable At Index(EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), 10);
        End;
        Call Subroutine(UpdateCache);
    }
}

rule ("Bounce Ball | Increase Strength | Deflect + Jump") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        Is Button Held(Event Player, Button(Jump)) == True;
        Event Player == Host Player;
        (Event Player).E == 3;
    }
    actions {
        If(Compare(Count Of(Global.TQ), >, 0));
            Modify Global Variable At Index(EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), Add, 0.1);
            Wait(0.1, Ignore Condition);
            Loop If Condition Is True;
        End;
        Call Subroutine(UpdateCache);
    }
}

rule ("Bounce Ball | Decrease Strength | Deflect + Crouch") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        Is Button Held(Event Player, Button(Crouch)) == True;
        Event Player == Host Player;
        (Event Player).E == 3;
        Is Button Held(Event Player, Button(Interact)) == False;
    }
    actions {
        If(Compare(Count Of(Global.TQ), >, 0));
            Modify Global Variable At Index(EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), Subtract, 0.1);
            Wait(0.1, Ignore Condition);
            Loop If Condition Is True;
        End;
        Call Subroutine(UpdateCache);
    }
}

rule ("Kill Orb | Increase Size | Deflect + Jump") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        Is Button Held(Event Player, Button(Jump)) == True;
        Event Player == Host Player;
        (Event Player).E > 1;
    }
    actions {
        If(Compare((Event Player).E, ==, 2));
            If(Compare(Count Of(Global.H), >, 0));
                Modify Global Variable At Index(I, Value In Array((Host Player).KillIndex_Cache, Global.J), Add, 0.1);
                Wait(0.1, Ignore Condition);
                Loop If Condition Is True;
            End;
        Else If(Compare((Event Player).E, ==, 3));
            If(Compare(Count Of(Global.TQ), >, 0));
                Modify Global Variable At Index(EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), Add, 0.1);
                Wait(0.1, Ignore Condition);
                Loop If Condition Is True;
            End;
        End;
        Call Subroutine(UpdateCache);
    }
}

rule ("Kill Orb | Decrease Size | Deflect + Crouch") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        Is Button Held(Event Player, Button(Crouch)) == True;
        Event Player == Host Player;
        (Event Player).E > 1;
        Is Button Held(Event Player, Button(Interact)) == False;
    }
    actions {
        If(Compare(Count Of(Global.H), >, 0));
            If(Compare((Event Player).E, ==, 2));
                Modify Global Variable At Index(I, Value In Array((Host Player).KillIndex_Cache, Global.J), Subtract, 0.1);
                Wait(0.1, Ignore Condition);
                Loop If Condition Is True;
            End;
        End;
        Call Subroutine(UpdateCache);
    }
}

rule ("Kill Orb / Bounce Orb | Move Toward/Backward | Deflect + Primary Fire") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        Or(Is Button Held(Event Player, Button(Primary Fire)), Is Button Held(Event Player, Button(Secondary Fire))) == True;
        Event Player == Host Player;
        (Event Player).E > 1;
    }
    actions {
        If(Compare((Event Player).E, ==, 2));
            If(Compare(Count Of(Global.H), ==, 0));
                Wait(0.016, Ignore Condition);
                Abort;
            End;
            While(And(Is Button Held(Event Player, Button(Ability 2)), Or(Is Button Held(Event Player, Button(Primary Fire)), Is Button Held(Event Player, Button(Secondary Fire)))));
                Modify Global Variable(L, Add, Multiply(Facing Direction Of(Event Player), If-Then-Else(Is Button Held(Event Player, Button(Primary Fire)), 0.0625, -0.0625)));
                Wait(0.016, Ignore Condition);
            End;
            Set Global Variable At Index(H, Value In Array((Host Player).KillIndex_Cache, Global.J), Global.L);
        Else If(Compare((Event Player).E, ==, 3));
            If(Compare(Count Of(Global.TQ), ==, 0));
                Wait(0.016, Ignore Condition);
                Abort;
            End;
            While(And(Is Button Held(Event Player, Button(Ability 2)), Or(Is Button Held(Event Player, Button(Primary Fire)), Is Button Held(Event Player, Button(Secondary Fire)))));
                Modify Global Variable(TQ3, Add, Multiply(Facing Direction Of(Event Player), If-Then-Else(Is Button Held(Event Player, Button(Primary Fire)), 0.0625, -0.0625)));
                Wait(0.016, Ignore Condition);
            End;
            Set Global Variable At Index(TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), Global.TQ3);
        End;
        Call Subroutine(UpdateCache);
        Wait(0.016, Ignore Condition);
    }
}

rule ("Checkpoint / Kill Orb / Bounce Orb | Create | Interact + Primary Fire") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Primary Fire)) == True;
        Event Player == Host Player;
    }
    actions {
        If(Compare((Event Player).E, ==, 1));
            If(And(Compare(Global.B, !=, -1), Compare(Distance Between(Event Player, Value In Array(Global.A, Global.B)), <=, 1.4)));
                Small Message(Event Player, Custom String("   Cannot place checkpoints too close.", Null, Null, Null));
                Abort;
            End;
            If(Compare(Global.B, ==, Subtract(Count Of(Global.A), 1)));
                Modify Global Variable(A, Append To Array, Subtract(Position Of(Event Player), Vector(0, 0, 0)));
                Set Global Variable(B, Subtract(Count Of(Global.A), 1));
            Else;
                Modify Global Variable(A, Append To Array, Position Of(Event Player));
                Set Global Variable(A, Mapped Array(Global.A, If-Then-Else(Compare(Current Array Index, <, Add(Global.B, 1)), Current Array Element, If-Then-Else(Compare(Current Array Index, ==, Add(Global.B, 1)), Last Of(Global.A), Value In Array(Global.A, Subtract(Current Array Index, 1))))));
                Modify Global Variable(B, Add, 1);
                Set Global Variable(killballnumber, Mapped Array(Global.killballnumber, Add(Current Array Element, If-Then-Else(Compare(Current Array Element, >=, Global.B), 1, 0))));
                Set Global Variable(pinballnumber, Mapped Array(Global.pinballnumber, Add(Current Array Element, If-Then-Else(Compare(Current Array Element, >=, Global.B), 1, 0))));
                Call Subroutine(UpdateCache);
                Call Subroutine(RebuildKillOrbs);
                Call Subroutine(RebuildBounceOrbs);
            End;
            Small Message(All Players(All Teams), Custom String("   New Checkpoint has been created", Null, Null, Null));
        Else If(Compare((Event Player).E, ==, 2));
            "if eventPlayer.CurrentCheckpoint == 0:\r\n     bigMessage(getAllPlayers(), \"Cannot place Kill Orb on first checkpoint\")\r\n else:"
            If(Compare(Add(Add(Count Of(Global.TQ), Count Of(Global.H)), Count Of(Global.CustomPortalStart)), >=, 193));
                Big Message(All Players(All Teams), Custom String("Orb/portal limit reached for this map, delete old orbs first", Null, Null, Null));
                Wait(0.016, Ignore Condition);
                Abort;
            End;
            Modify Global Variable(H, Append To Array, Position Of(Event Player));
            Modify Global Variable(killballnumber, Append To Array, (Event Player).A);
            Call Subroutine(UpdateCache);
            Set Global Variable(J, Subtract(Count Of((Host Player).KillIndex_Cache), 1));
            Set Global Variable At Index(I, Value In Array((Host Player).KillIndex_Cache, Global.J), 5);
            "for TempIterator1 in range(len(KillBallPositions)):\r\n     destroyEffect(KillBallEffects[TempIterator1])\r\n KillBallEffects = []\r\n KILLBALL()"
            Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null), Compare((Current Array Element).A, ==, Value In Array(Global.killballnumber, Evaluate Once(Value In Array((Host Player).KillIndex_Cache, Global.J))))), Sphere, Color(Blue), Value In Array(Global.H, Evaluate Once(Value In Array((Host Player).KillIndex_Cache, Global.J))), Value In Array(Global.I, Evaluate Once(Value In Array((Host Player).KillIndex_Cache, Global.J))), Visible To Position and Radius);
            Modify Global Variable(K, Append To Array, Last Created Entity);
            Call Subroutine(UpdateCache);
            Set Global Variable(J, Subtract(Count Of((Host Player).KillIndex_Cache), 1));
            Set Global Variable(L, Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)));
            Call Subroutine(RebuildKillOrbs);
            Big Message(All Players(All Teams), Custom String("New Kill Orb has been created! \r\nIt's only valid for checkpoint {0}", (Event Player).A, Null, Null));
        Else If(Compare((Event Player).E, ==, 3));
            "if eventPlayer.CurrentCheckpoint == 0:\r\n     bigMessage(getAllPlayers(), \"Cannot place bounce orb on first checkpoint\")\r\n else:"
            If(Compare(Add(Add(Count Of(Global.TQ), Count Of(Global.H)), Count Of(Global.CustomPortalStart)), >=, 193));
                Big Message(All Players(All Teams), Custom String("Orb/portal limit reached for this map, delete old orbs first", Null, Null, Null));
                Wait(0.016, Ignore Condition);
                Abort;
            End;
            Modify Global Variable(TQ, Append To Array, Position Of(Event Player));
            Modify Global Variable(pinballnumber, Append To Array, (Event Player).A);
            Call Subroutine(UpdateCache);
            Set Global Variable(TQ1, Subtract(Count Of((Host Player).BounceIndex_Cache), 1));
            Set Global Variable At Index(EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), 10);
            Set Global Variable At Index(TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), False);
            Set Global Variable At Index(TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), False);
            Set Global Variable At Index(BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), False);
            "for TempIterator1 in range(len(BouncePositions)):\r\n     destroyEffect(BounceEffects[TempIterator1])\r\n BounceEffects = []\r\n pinball()"
            Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null), And(Compare((Current Array Element).A, ==, Value In Array(Global.pinballnumber, Evaluate Once(Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)))), Not(Array Contains((Current Array Element).LockCollected, Evaluate Once(Value In Array(Global.TQ, Evaluate Once(Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)))))))), Orb, If-Then-Else(Value In Array(Global.BounceToggleLock, Evaluate Once(Value In Array((Host Player).BounceIndex_Cache, Global.TQ1))), Color(Orange), Color(Green)), Value In Array(Global.TQ, Evaluate Once(Value In Array((Host Player).BounceIndex_Cache, Global.TQ1))), 1, Visible To Position Radius and Color);
            Modify Global Variable(TQ2, Append To Array, Last Created Entity);
            Call Subroutine(UpdateCache);
            Set Global Variable(TQ1, Subtract(Count Of((Host Player).BounceIndex_Cache), 1));
            Set Global Variable(TQ3, Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)));
            Call Subroutine(RebuildBounceOrbs);
            Big Message(All Players(All Teams), Custom String("New Bounce Orb has been created! \r\nIt's only valid for checkpoint {0}", (Event Player).A, Null, Null));
        End;
        Wait(0.64, Ignore Condition);
    }
}

rule ("Checkpoint / Kill Orb / Bounce Orb | Delete | Interact + Secondary Fire") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Secondary Fire)) == True;
        Event Player == Host Player;
    }
    actions {
        If(Compare((Event Player).E, ==, 1));
            "Resync Kill Orbs"
            Set Player Variable(Event Player, Temp, Empty Array);
            Set Player Variable(Event Player, Temp, Filtered Array(Mapped Array(Global.killballnumber, If-Then-Else(Compare(Current Array Element, ==, Global.B), Current Array Index, -1)), Compare(Current Array Element, >=, 0)));
            "eventPlayer.Temp = [i for e, i in KillballCheckpoints if e == SelectedCheckpoint_Editing]"
            For Global Variable(NANBA, 0, Count Of((Event Player).Temp), 1);
                Destroy Effect(Value In Array(Global.K, Value In Array((Event Player).Temp, Global.NANBA)));
                Modify Global Variable(K, Remove From Array By Index, Value In Array((Event Player).Temp, Global.NANBA));
                Wait(0.016, Ignore Condition);
            End;
            "Remove specified checkpoint"
            Set Global Variable(killballnumber, Remove From Array(Global.killballnumber, Global.B));
            "Decrement checkpoints after removed one"
            Set Global Variable(killballnumber, Mapped Array(Global.killballnumber, Subtract(Current Array Element, If-Then-Else(Compare(Current Array Element, >, Global.B), 1, 0))));
            "Remove Radii at Checkpoint indexes (temp)"
            Set Global Variable(I, Filtered Array(Global.I, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(H, Filtered Array(Global.H, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(J, Subtract(Count Of((Host Player).KillIndex_Cache), 1));
            Set Global Variable(L, Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)));
            Set Player Variable(Event Player, Temp, Empty Array);
            "Resync Bounce Orbs"
            Set Player Variable(Event Player, Temp, Filtered Array(Mapped Array(Global.pinballnumber, If-Then-Else(Compare(Current Array Element, ==, Global.B), Current Array Index, -1)), Compare(Current Array Element, >=, 0)));
            "eventPlayer.Temp = [i for e, i in BouncePadCheckpoints if e == SelectedCheckpoint_Editing]"
            For Global Variable(NANBA, 0, Count Of((Event Player).Temp), 1);
                Destroy Effect(Value In Array(Global.TQ2, Value In Array((Event Player).Temp, Global.NANBA)));
                Modify Global Variable(TQ2, Remove From Array By Index, Value In Array((Event Player).Temp, Global.NANBA));
                Wait(0.016, Ignore Condition);
            End;
            "Remove specified checkpoint"
            Set Global Variable(pinballnumber, Remove From Array(Global.pinballnumber, Global.B));
            "Decrement checkpoints after removed one"
            Set Global Variable(pinballnumber, Mapped Array(Global.pinballnumber, Subtract(Current Array Element, If-Then-Else(Compare(Current Array Element, >, Global.B), 1, 0))));
            Set Global Variable(TQ, Filtered Array(Global.TQ, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(EditMode, Filtered Array(Global.EditMode, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(TQ5, Filtered Array(Global.TQ5, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(TQ6, Filtered Array(Global.TQ6, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(BounceToggleLock, Filtered Array(Global.BounceToggleLock, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(TQ1, Subtract(Count Of((Host Player).BounceIndex_Cache), 1));
            Set Global Variable(TQ3, Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)));
            Modify Global Variable(A, Remove From Array By Index, Global.B);
            Modify Global Variable(C, Remove From Array By Index, Global.B);
            If(Compare(Global.B, <=, 0));
                Set Global Variable(B, -1);
                Skip(2);
            End;
            Modify Global Variable(B, Subtract, 1);
            Call Subroutine(RebuildKillOrbs);
            Call Subroutine(RebuildBounceOrbs);
            Small Message(All Players(All Teams), Custom String("   Checkpoint has been deleted", Null, Null, Null));
        Else If(And(And(Compare((Event Player).E, ==, 2), Compare(Count Of(Global.H), !=, 0)), (Host Player).KillPosition_Cache));
            Modify Global Variable(H, Remove From Array By Index, Value In Array((Host Player).KillIndex_Cache, Global.J));
            Modify Global Variable(I, Remove From Array By Index, Value In Array((Host Player).KillIndex_Cache, Global.J));
            Modify Global Variable(killballnumber, Remove From Array By Index, Value In Array((Host Player).KillIndex_Cache, Global.J));
            Destroy Effect(Value In Array(Global.K, Value In Array((Host Player).KillIndex_Cache, Global.J)));
            Modify Global Variable(K, Remove From Array By Index, Value In Array((Host Player).KillIndex_Cache, Global.J));
            Skip If(Compare(Global.J, <=, 0), 1);
            Modify Global Variable(J, Subtract, 1);
            Call Subroutine(UpdateCache);
            Call Subroutine(RebuildKillOrbs);
            Set Global Variable(L, Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)));
        Else If(And(And(Compare((Event Player).E, ==, 3), Compare(Count Of(Global.TQ), !=, 0)), (Host Player).BouncePosition_Cache));
            Modify Global Variable(TQ, Remove From Array By Index, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1));
            Modify Global Variable(EditMode, Remove From Array By Index, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1));
            Modify Global Variable(TQ5, Remove From Array By Index, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1));
            Modify Global Variable(TQ6, Remove From Array By Index, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1));
            Modify Global Variable(BounceToggleLock, Remove From Array By Index, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1));
            Destroy Effect(Value In Array(Global.TQ2, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)));
            Modify Global Variable(TQ2, Remove From Array By Index, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1));
            Modify Global Variable(pinballnumber, Remove From Array By Index, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1));
            Skip If(Compare(Global.TQ1, <=, 0), 1);
            Modify Global Variable(TQ1, Subtract, 1);
            Call Subroutine(UpdateCache);
            Call Subroutine(RebuildBounceOrbs);
            Set Global Variable(TQ3, Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)));
        End;
        Call Subroutine(UpdateCache);
    }
}

rule ("Checkpoint | Move | Ultimate + Interact") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Ultimate)) == True;
        Is Button Held(Event Player, Button(Interact)) == True;
        Event Player == Host Player;
    }
    actions {
        Small Message(All Players(All Teams), If-Then-Else(Compare(Count Of(Value In Array(Global.A, Global.B)), !=, 0), Custom String("   Checkpoint {0} has been deleted", Global.B, Null, Null), Custom String("", Null, Null, Null)));
        Set Global Variable At Index(A, Global.B, Subtract(Position Of(Event Player), Vector(0, 0, 0)));
        Small Message(All Players(All Teams), Custom String("   Checkpoint has been moved to your position", Null, Null, Null));
    }
}

rule ("Kill Orb / Bounce Orb | Select Previous | Interact + Crouch") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Crouch)) == True;
        Event Player == Host Player;
    }
    actions {
        If(Compare((Event Player).E, ==, 2));
            "current = ( current - 1 ) % len(cache)"
            Set Global Variable(J, Modulo(Subtract(Global.J, 1), Count Of((Event Player).KillIndex_Cache)));
            Set Global Variable(J, If-Then-Else(Compare(Global.J, >=, 0), Global.J, Subtract(Count Of((Event Player).KillIndex_Cache), 1)));
            Set Global Variable(L, Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)));
        Else If(Compare((Event Player).E, ==, 3));
            Set Global Variable(TQ1, Modulo(Subtract(Global.TQ1, 1), Count Of((Event Player).BounceIndex_Cache)));
            Set Global Variable(TQ1, If-Then-Else(Compare(Global.TQ1, >=, 0), Global.TQ1, Subtract(Count Of((Event Player).BounceIndex_Cache), 1)));
            Set Global Variable(TQ3, Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)));
    }
}

rule ("Kill Orb / Bounce Orb | Select Next | Interact + Jump") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Jump)) == True;
        Event Player == Host Player;
    }
    actions {
        If(Compare((Event Player).E, ==, 2));
            "current = ( current + 1 ) % len(cache)"
            Set Global Variable(J, Modulo(Add(Global.J, 1), Count Of((Event Player).KillIndex_Cache)));
            Set Global Variable(L, Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)));
        Else If(Compare((Event Player).E, ==, 3));
            Set Global Variable(TQ1, Modulo(Add(Global.TQ1, 1), Count Of((Event Player).BounceIndex_Cache)));
            Set Global Variable(TQ3, Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)));
    }
}

rule ("Checkpoint | Toggle Checkpoint Sizes | Interact + Dash") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Ability 1)) == True;
        Event Player == Host Player;
    }
    actions {
        Set Player Variable(Event Player, EffectSizeToggle, Not((Event Player).EffectSizeToggle));
    }
}

rule ("Teleport | Add | Interact + Rel﻿oad") {
    event {
        Ongoing - Global;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Host Player, Button(Melee)) == False;
        Is Button Held(Host Player, Button(Interact)) == True;
        Is Button Held(Host Player, Button(Reload)) == True;
        Count Of(Global.A) > 1;
        (Host Player).E == 1;
        Global.B > 0;
    }
    actions {
        Wait Until(Or(Is Button Held(Host Player, Button(Melee)), Not(And(Is Button Held(Host Player, Button(Interact)), Is Button Held(Host Player, Button(Reload))))), 0.5);
        Abort If(Or(Is Button Held(Host Player, Button(Melee)), And(Is Button Held(Host Player, Button(Interact)), Is Button Held(Host Player, Button(Reload)))));
        Set Global Variable At Index(A, Global.B, Array(If-Then-Else(Compare(Count Of(Value In Array(Global.A, Global.B)), !=, 0), First Of(Value In Array(Global.A, Global.B)), Value In Array(Global.A, Global.B)), Position Of(Host Player)));
        Small Message(All Players(All Teams), Custom String("   Teleport has been added for checkpoint {0}", Global.B, Null, Null));
    }
}

disabled rule ("------------------------------------------------------------------------  General rules ------------------------------------------------------------------------ ") {
    event {
        Ongoing - Global;
    }
}

rule ("Setup and Variables") {
    event {
        Ongoing - Global;
    }
    actions {
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
        Set Global Variable(Dao, If-Then-Else(And(Count Of(Filtered Array(Global.Dao, And(Compare(Current Array Element, !=, -1), Compare(Current Array Element, !=, Empty Array)))), Compare(Global.Dao, !=, Null)), Global.Dao, Empty Array));
        Set Global Variable(SHIFT, If-Then-Else(And(Count Of(Filtered Array(Global.SHIFT, And(Compare(Current Array Element, !=, -1), Compare(Current Array Element, !=, Empty Array)))), Compare(Global.SHIFT, !=, Null)), Global.SHIFT, Empty Array));
        Set Global Variable(pinballnumber, If-Then-Else(Count Of(Global.pinballnumber), Global.pinballnumber, Empty Array));
        Set Global Variable(A, If-Then-Else(Count Of(Global.A), Global.A, Empty Array));
        Set Global Variable(A, If-Then-Else(Count Of(Global.A), Global.A, Empty Array));
        Set Global Variable(killballnumber, If-Then-Else(Count Of(Global.killballnumber), Global.killballnumber, Empty Array));
        Set Global Variable(H, If-Then-Else(Count Of(Global.H), Global.H, Empty Array));
        Set Global Variable(I, If-Then-Else(Count Of(Global.I), Global.I, Empty Array));
        Set Global Variable(K, If-Then-Else(Count Of(Global.K), Global.K, Empty Array));
        Set Global Variable(J, 0);
        Set Global Variable(TQ, If-Then-Else(Count Of(Global.TQ), Global.TQ, Empty Array));
        Set Global Variable(TQ2, If-Then-Else(Count Of(Global.TQ2), Global.TQ2, Empty Array));
        Set Global Variable(EditMode, If-Then-Else(Count Of(Global.EditMode), Global.EditMode, Empty Array));
        Set Global Variable(TQ1, 0);
        Set Global Variable(TQ5, If-Then-Else(Count Of(Global.TQ5), Global.TQ5, Empty Array));
        Set Global Variable(TQ6, If-Then-Else(Count Of(Global.TQ6), Global.TQ6, Empty Array));
        Set Global Variable(BounceToggleLock, If-Then-Else(Count Of(Global.BounceToggleLock), Global.BounceToggleLock, Empty Array));
        Set Global Variable(LeaderBoardFull, Empty Array);
        Wait(1, Ignore Condition);
        "-! comp minutes !- fill in second to last number\r\n 5-240"
        Set Global Variable(CompTime, Workshop Setting Integer(Custom String("Competitive mode", Null, Null, Null), Custom String("time limit", Null, Null, Null), ${comptime}, 1, 240, 101));
        "-! comp count !- fill in second to last number"
        Set Global Variable(CompAtmpNum, Workshop Setting Integer(Custom String("Competitive mode", Null, Null, Null), Custom String("attempt count", Null, Null, Null), ${compattempt}, 0, 500, 102));
        Set Global Variable(CompRestartLimit, Workshop Setting Toggle(Custom String("Competitive mode", Null, Null, Null), Custom String("disable restart during run", Null, Null, Null), ${comprestarts}, 103));
        Set Global Variable(CompMode, Workshop Setting Toggle(Custom String("Competitive mode", Null, Null, Null), Custom String("Turn on competitive mode", Null, Null, Null),  ${compon}, 100));
        "This probably isn't necessary"
        Set Global Variable(B, Subtract(Count Of(Global.A), 1));
        "KILLBALL()\r\n wait(2)\r\n pinball()"
        Set Global Variable(PortalOn, Workshop Setting Toggle(Custom String("map settings", Null, Null, Null), Custom String("enable portals (control maps)", Null, Null, Null), ${portalon}, 0));
        Set Global Variable(save, Empty Array);
        If(Global.CompMode);
            Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Custom String("                                                                                                                           ", Null, Null, Null), Null, Null, Top, -22, Color(White), Null, Null, Visible To, Default Visibility);
            "replace the instructions custom string for your own instructions. type \\n for enter/next line"
            If(First Of(Global.instructiontext));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, First Of(Global.instructiontext), Top, -21, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            If(Value In Array(Global.instructiontext, 1));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, Value In Array(Global.instructiontext, 1), Top, -20, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            If(Value In Array(Global.instructiontext, 2));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, Value In Array(Global.instructiontext, 2), Top, -19, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            If(Value In Array(Global.instructiontext, 3));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, Value In Array(Global.instructiontext, 3), Top, -18, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Custom String("                                   Press {0} to start                                ", Input Binding String(Button(Interact)), Null, Null), Null, Null, Top, -17, Color(White), Null, Null, Visible To and String, Default Visibility);
        Else;
            Create HUD Text(If-Then-Else(Compare((Host Player).E, <, 1), All Players(All Teams), Null), Null, Null, Custom String("Hold {0} | Spectate{1}", Input Binding String(Button(Interact)), If-Then-Else((Local Player).F, Custom String(" | ON", Null, Null, Null), Custom String("", Null, Null, Null)), Null), Right, -14, Null, Null, If-Then-Else((Local Player).F, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
            Create HUD Text(If-Then-Else(Compare((Host Player).E, <, 1), All Players(All Teams), Null), Null, Null, Custom String("Hold {0} | invisible{1}", Input Binding String(Button(Ability 2)), If-Then-Else((Local Player).invis, Custom String(" | ON", Null, Null, Null), Custom String("", Null, Null, Null)), Null), Right, -13, Null, Null, If-Then-Else((Local Player).invis, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
            Create HUD Text(If-Then-Else(Compare((Local Player).E, <, 1), All Players(All Teams), Null), Null, Null, Custom String("{0} + {1} | Practice{2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Melee)), If-Then-Else((Local Player).PracticeToggle, Custom String(" | ({0})", Subtract((Local Player).A, (Local Player).PracticeCheckpoint), Null, Null), Custom String("", Null, Null, Null))), Right, -11, Null, Null, If-Then-Else((Local Player).PracticeToggle, Color(Green), If-Then-Else(Compare((Local Player).C, ==, 1), Color(Gray), Color(White))), Visible To String and Color, Default Visibility);
            Create HUD Text(Filtered Array(All Players(All Teams), And((Current Array Element).PracticeToggle, Compare((Host Player).E, <, 1))), Null, Custom String("{0} + {1} | Next level\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Previous level\n{2} | Start from practice cp ", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Interact)))), Null, Right, -10, Null, Color(Lime Green), Null, Visible To String and Color, Default Visibility);
            Create HUD Text(Filtered Array(All Players(All Teams), And(And(Compare((Current Array Element).A, ==, Subtract(Count Of(Global.A), 1)), Compare((Current Array Element).E, <, 1)), Compare((Current Array Element).PracticeToggle, !=, 1))), Null, Null, Custom String("Hold {0} | Traces{1}", Ability Icon String(Hero(Genji), Button(Ultimate)), If-Then-Else((Local Player).TracesOff, Custom String("", Null, Null, Null), Custom String(" | ON ", Null, Null, Null)), Null), Right, -12, Null, Null, If-Then-Else((Local Player).TracesOff, Color(White), Color(Green)), Visible To String and Color, Default Visibility);
        End;
        "async(CreateLeaderBoard(), AsyncBehavior.RESTART)"
        Call Subroutine(CreateLeaderBoard);
        "padding for custom gud"
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nv", Null, Null, Null), Top, -1, Null, Null, Color(Orange), Visible To, Default Visibility);
        "##hudSubtext(getAllPlayers(), \"{0}+{1}+{2} | Restart\".format(buttonString(Button.CROUCH), buttonString(Button.ABILITY_2), buttonString(Button.INTERACT)), HudPosition.RIGHT, -20, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)"
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0}+{1}+{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 2)), Custom String("{0} | Restart\nHold {1} | leaderboard", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)), Null)), Right, -20, Null, Null, Color(White), Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0} {1} |  {2}", If-Then-Else((Local Player).quick_restart, Custom String("", Null, Null, Null), Custom String("Hold", Null, Null, Null)), Input Binding String(Button(Reload)), If-Then-Else((Local Player).quick_restart, Custom String("Quick reset", Null, Null, Null), Custom String("Enable Quick reset", Null, Null, Null))), Right, -18, Null, Null, Color(White), Visible To and String, Default Visibility);
        "##hudSubtext(getAllPlayers() if hostPlayer.EditModeSelection < 1 else null, \"Hold {0} | leaderboard\".format(buttonString(Button.MELEE)), HudPosition.RIGHT, -17, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)"
        Create HUD Text(If-Then-Else(Compare((Host Player).E, <, 1), All Players(All Teams), Null), Null, Null, Custom String("Hold {0} | Preview orb/portal", Input Binding String(Button(Primary Fire)), Null, Null), Right, -16, Null, Null, If-Then-Else(Is Button Held(Local Player, Button(Primary Fire)), Color(Green), If-Then-Else(Is Button Held(Local Player, Button(Primary Fire)), Color(Green), Color(White))), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else(And(Compare((Host Player).E, <, 1), Is Button Held(Local Player, Button(Primary Fire))), All Players(All Teams), Null), Null, Custom String("Walk left/right | preview others\nAim | change preview angle", Null, Null, Null), Null, Right, -15, Null, Color(Lime Green), Null, Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0}+{1} | Invincible{2}", Input Binding String(Button(Reload)), Input Binding String(Button(Melee)), If-Then-Else(Compare((Local Player).C, ==, 1), Custom String(" | ON", Null, Null, Null), Custom String("", Null, Null, Null))), Right, -19, Null, Null, If-Then-Else(Compare((Local Player).C, ==, 1), Color(Green), Color(White)), Visible To String and Color, Default Visibility);
        "hudSubtext([i for i in getAllPlayers() if i.CurrentCheckpoint == len(CheckpointPositions) - 1 and i.EditModeSelection < 1 and i.PracticeToggle != 1], \"Hold {0} | Toggle Traces\".format(abilityIconString(Hero.GENJI,Button.ULTIMATE)), HudPosition.RIGHT, -14, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)"
        If(Not((Host Player).EditorOn));
            Set Global Variable(Difficultyhud, Workshop Setting Combo(Custom String("map settings", Null, Null, Null), Custom String("difficulty (display hud)", Null, Null, Null), ${difficultyhud}, Array(Custom String("beginner", Null, Null, Null), Custom String("easy-", Null, Null, Null), Custom String("easy", Null, Null, Null), Custom String("easy+", Null, Null, Null), Custom String("medium-", Null, Null, Null), Custom String("medium", Null, Null, Null), Custom String("medium+", Null, Null, Null), Custom String("hard-", Null, Null, Null), Custom String("hard", Null, Null, Null), Custom String("hard+", Null, Null, Null), Custom String("very hard-", Null, Null, Null), Custom String("very hard", Null, Null, Null), Custom String("very hard+", Null, Null, Null), Custom String("extreme-", Null, Null, Null), Custom String("extreme", Null, Null, Null), Custom String("extreme+", Null, Null, Null), Custom String("hell", Null, Null, Null), Custom String("don't display", Null, Null, Null)), 0));
            "17th entry is dont display"
            If(Compare(Global.Difficultyhud, <, 17));
                Create HUD Text(All Players(All Teams), Null, Value In Array(Array(Custom String("beginner", Null, Null, Null), Custom String("easy -", Null, Null, Null), Custom String("easy", Null, Null, Null), Custom String("easy +", Null, Null, Null), Custom String("medium -", Null, Null, Null), Custom String("medium", Null, Null, Null), Custom String("medium +", Null, Null, Null), Custom String("hard -", Null, Null, Null), Custom String("hard", Null, Null, Null), Custom String("hard +", Null, Null, Null), Custom String("very hard -", Null, Null, Null), Custom String("very hard", Null, Null, Null), Custom String("very hard +", Null, Null, Null), Custom String("extreme -", Null, Null, Null), Custom String("extreme", Null, Null, Null), Custom String("extreme +", Null, Null, Null), Custom String("hell", Null, Null, Null)), Global.Difficultyhud), Null, Top, -24, Null, Value In Array(Array(Color(Green), Color(Lime Green), Color(Lime Green), Color(Lime Green), Color(Yellow), Color(Yellow), Color(Yellow), Color(Orange), Color(Orange), Color(Orange), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Color(Red), Color(Red), Color(Red), Custom Color(150, 0, 0, 255)), Global.Difficultyhud), Null, Visible To, Default Visibility);
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
        Abort If(Not((Host Player).EditorOn));
        Call Subroutine(RebuildKillOrbs);
        Call Subroutine(RebuildBounceOrbs);
    }
}

rule ("Match time") {
    event {
        Ongoing - Global;
    }
    actions {
        If(Compare(Current Game Mode, !=, Game Mode(Skirmish)));
            Wait(0.25, Ignore Condition);
            Set Match Time(1);
            Wait(1.1, Ignore Condition);
            Set Match Time(1);
            Wait(1.1, Ignore Condition);
            Wait(10, Ignore Condition);
        End;
        Set Match Time(69);
        Pause Match Time;
        Wait(5, Ignore Condition);
        "269"
        Set Global Variable(TimeRemaining, 265);
        Create HUD Text(All Players(All Teams), Null, Custom String("  Server Restarts In {0} Min  ", Global.TimeRemaining, Null, Null), Null, Right, -200, Null, Color(Red), Null, Visible To and String, Visible Always);
        While(Compare(Global.TimeRemaining, >, 0));
            Wait(60, Ignore Condition);
            Modify Global Variable(TimeRemaining, Subtract, 1);
            If(Global.CompMode);
                Modify Global Variable(CompTime, Subtract, 1);
                If(Compare(Global.CompTime, ==, 0));
                    Big Message(All Players(All Teams), Custom String("time's up", Null, Null, Null));
                    Set Player Variable(All Players(All Teams), CompDone, True);
                    "getAllPlayers().InvincibleToggle = 1"
                    Stop Chasing Player Variable(All Players(All Teams), D);
                    "getAllPlayers().setUltEnabled(true)\r\ngetAllPlayers().setUltCharge(100)\r\ngetAllPlayers().setAbility1Enabled(true)"
                    Disable Built-In Game Mode Respawning(All Players(All Teams));
                    Kill(All Players(All Teams), Null);
                    Wait(0.032, Ignore Condition);
                    Start Rule(CreateLeaderBoard, Restart Rule);
                End;
            End;
        End;
        Big Message(All Players(All Teams), Custom String("maximum lobby time expired, restarting", Null, Null, Null));
        Wait(5, Ignore Condition);
        If(Compare(Current Game Mode, ==, Game Mode(Deathmatch)));
            Declare Player Victory(Host Player);
        Else;
            Declare Team Victory(Team Of(Host Player));
    }
}

rule ("Genji Swapper 9000") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    actions {
        If(Not(Is Dummy Bot(Event Player)));
            Start Forcing Player To Be Hero(Event Player, Hero(Genji));
    }
}

rule ("Initialize and CP HUD") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        "@Hero genji"
        Has Spawned(Event Player) == True;
        Hero Of(Event Player) == Hero(Genji);
    }
    actions {
        Disable Game Mode HUD(Event Player);
        If(Compare(Total Time Elapsed, <, 3));
            "make sure everything loaded, specialy things like comp mode"
            Wait(2, Ignore Condition);
        End;
        If(Global.CompMode);
            Set Invisible(Event Player, All);
            Create HUD Text(Event Player, Custom String(" ", Null, Null, Null), If-Then-Else(Compare(Global.CompTime, <=, 0), Custom String("! competition is over !", Null, Null, Null), Custom String("time left: {0} min{1}", Global.CompTime, If-Then-Else(Compare((Event Player).AttemptCount, ==, -1), Custom String("\nYou are out of attemps", Null, Null, Null), If-Then-Else(Compare(Global.CompAtmpNum, >, 0), Custom String("\nAttempt {0} / {1}", (Event Player).AttemptCount, Global.CompAtmpNum, Null), Custom String("", Null, Null, Null))), Null)), If-Then-Else(Compare(Global.CompTime, >, 0), Custom String("competitive mode", Null, Null, Null), Custom String("competitive mode\n\n\n", Null, Null, Null)), Top, -860, Color(Yellow), Color(Yellow), Color(Yellow), String, Default Visibility);
            "instructions and settings for comp start"
            If(Not(Array Contains(Global.CompAtmpSaveNames, Custom String("{0}", Event Player, Null, Null))));
                Set Player Variable(Event Player, instructionhud, True);
                Modify Global Variable(CompAtmpSaveNames, Append To Array, Custom String("{0}", Event Player, Null, Null));
                Modify Global Variable(CompAtmpSaveCount, Append To Array, 1);
                Set Player Variable(Event Player, AttemptCount, 1);
                Set Move Speed(Event Player, 0);
                Wait Until(Not(Is Button Held(Event Player, Button(Interact))), 1);
                Wait Until(Is Button Held(Event Player, Button(Interact)), 99999);
                Set Move Speed(Event Player, 100);
                Set Player Variable(Event Player, instructionhud, False);
            Else;
                Set Player Variable(Event Player, AttemptCount, Value In Array(Global.CompAtmpSaveCount, Index Of Array Value(Global.CompAtmpSaveNames, Custom String("{0}", Event Player, Null, Null))));
                Small Message(Event Player, Custom String("now {0}", (Event Player).AttemptCount, Null, Null));
            End;
            If(Or(Compare((Event Player).AttemptCount, ==, -1), Compare(Global.CompTime, <, 1)));
                Set Player Variable(Event Player, CompDone, True);
            End;
        End;
        "LEFT, -2"
        Create HUD Text(Event Player, Null, Null, Custom String("Time {0}", Custom String("{0} sec", (Event Player).D, Null, Null), Null, Null), Left, -5, Null, Null, Color(White), Visible To and String, Default Visibility);
        "orange sub+text"
        Create HUD Text(Event Player, Null, If-Then-Else((Event Player).BounceLockMax_Cache, Custom String("orange orbs {0} / {1}", Count Of((Event Player).LockCollected), (Event Player).BounceLockMax_Cache, Null), Custom String("", Null, Null, Null)), Custom String("Level {0} / {1}", (Event Player).A, Subtract(Count Of(Global.A), 1), Null), Top, -14, Color(White), Color(Orange), Color(White), String, Default Visibility);
        "in same\r\n breaks if the defined thing is on the same line"
        Set Player Variable(Event Player, EditorOn, Workshop Setting Toggle(Custom String("Editor", Null, Null, Null), Custom String("Editor mode", Null, Null, Null), ${editoron}  , 0));
        "StartGame_Sub is the initialization of the game"
        Call Subroutine(Sub1);
        Enable Death Spectate All Players(Event Player);
        Enable Death Spectate Target HUD(Event Player);
        Set Player Variable(Event Player, F, 0);
        "Climbing the wall prompts the HUD"
        Set Player Variable(Event Player, J, 2);
        "CheckpointEffect_Sub is the checkpoint effect display"
        Call Subroutine(Sub0);
    }
}

rule ("leaderboard hud") {
    event {
        Subroutine;
        CreateLeaderBoard;
    }
    actions {
        "sub is tied to player so remade turned global"
        Set Global Variable(LeaderBoardRemake, False);
        Wait(0.016, Ignore Condition);
        Set Global Variable(LeaderBoardRemake, True);
    }
}

rule ("remake leaderboard") {
    event {
        Ongoing - Global;
    }
    conditions {
        Global.LeaderBoardRemake != False;
    }
    actions {
        "account for delay in completion"
        Wait(0.016, Ignore Condition);
        Set Global Variable(LeaderBoardFull, Sorted Array(Global.LeaderBoardFull, Value In Array(Current Array Element, 1)));
        Destroy HUD Text(First Of(Global.LeaderBoardHuds));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 1));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 2));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 3));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 4));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 5));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 6));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 7));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 8));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 9));
        Destroy HUD Text(Value In Array(Global.LeaderBoardHuds, 10));
        "wait()\r\n 20 board comp and non comp"
        If(Or(Not(Global.CompMode), And(Global.CompMode, Compare(Global.CompTime, >, 0))));
            "top 5"
            If(First Of(Global.LeaderBoardFull));
                Create HUD Text(All Players(All Teams), Null, Null, Custom String(" \n{0} Top 5 {0}", Ability Icon String(Hero(Genji), Button(Primary Fire)), Null, Null), Right, 0, Null, Null, Color(White), Visible To, Default Visibility);
                Set Global Variable At Index(LeaderBoardHuds, 0, Last Text ID);
                Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(First Of(Global.LeaderBoardFull)), Value In Array(First Of(Global.LeaderBoardFull), 2), Right, 1, Color(Red), Color(Red), Color(Red), Visible To, Default Visibility);
                Set Global Variable At Index(LeaderBoardHuds, 1, Last Text ID);
            End;
            If(Value In Array(Global.LeaderBoardFull, 1));
                Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 1)), Value In Array(Value In Array(Global.LeaderBoardFull, 1), 2), Right, 2, Color(Orange), Color(Orange), Color(Orange), Visible To, Default Visibility);
                Set Global Variable At Index(LeaderBoardHuds, 2, Last Text ID);
            End;
            If(Value In Array(Global.LeaderBoardFull, 2));
                Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 2)), Value In Array(Value In Array(Global.LeaderBoardFull, 2), 2), Right, 3, Color(Yellow), Color(Yellow), Color(Yellow), Visible To, Default Visibility);
                Set Global Variable At Index(LeaderBoardHuds, 3, Last Text ID);
            End;
            If(Value In Array(Global.LeaderBoardFull, 3));
                Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 3)), Value In Array(Value In Array(Global.LeaderBoardFull, 3), 2), Right, 4, Color(Lime Green), Color(Lime Green), Color(Lime Green), Visible To, Default Visibility);
                Set Global Variable At Index(LeaderBoardHuds, 4, Last Text ID);
            End;
            If(Value In Array(Global.LeaderBoardFull, 4));
                Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 4)), Value In Array(Value In Array(Global.LeaderBoardFull, 4), 2), Right, 5, Color(Green), Color(Green), Color(Green), Visible To, Default Visibility);
                Set Global Variable At Index(LeaderBoardHuds, 5, Last Text ID);
            End;
            Create HUD Text((Local Player).LeaderboardToggle, Custom String("　　　　 {0} Leaderboard {0} 　　　", Icon String(Flag), Null, Null), Null, Null, Top, -780, Color(Blue), Null, Null, Visible To, Visible Never);
            Set Global Variable At Index(LeaderBoardHuds, 6, Last Text ID);
            Create HUD Text((Local Player).LeaderboardToggle, Custom String("　　　　　　　　　　　　　　　　　　\n　 1:　{0} - {1}　\n　 2:　{2}", If-Then-Else(First Of(Global.LeaderBoardFull), First Of(First Of(Global.LeaderBoardFull)), Custom String("", Null, Null, Null)), If-Then-Else(First Of(Global.LeaderBoardFull), Value In Array(First Of(Global.LeaderBoardFull), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 3:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 1), First Of(Value In Array(Global.LeaderBoardFull, 1)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 1), Value In Array(Value In Array(Global.LeaderBoardFull, 1), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 4:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 2), First Of(Value In Array(Global.LeaderBoardFull, 2)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 2), Value In Array(Value In Array(Global.LeaderBoardFull, 2), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 5:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 3), First Of(Value In Array(Global.LeaderBoardFull, 3)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 3), Value In Array(Value In Array(Global.LeaderBoardFull, 3), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 4), First Of(Value In Array(Global.LeaderBoardFull, 4)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 4), Value In Array(Value In Array(Global.LeaderBoardFull, 4), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -779, Color(White), Null, Null, Visible To, Default Visibility);
            Set Global Variable At Index(LeaderBoardHuds, 7, Last Text ID);
            If(Value In Array(Global.LeaderBoardFull, 5));
                Create HUD Text((Local Player).LeaderboardToggle, Custom String("　　　　　　　　　　　　　　　　　　\n　 6:　{0} - {1}　\n　 7:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 5), First Of(Value In Array(Global.LeaderBoardFull, 5)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 5), Value In Array(Value In Array(Global.LeaderBoardFull, 5), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 8:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 6), First Of(Value In Array(Global.LeaderBoardFull, 6)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 6), Value In Array(Value In Array(Global.LeaderBoardFull, 6), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 9:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 7), First Of(Value In Array(Global.LeaderBoardFull, 7)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 7), Value In Array(Value In Array(Global.LeaderBoardFull, 7), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　10:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 8), First Of(Value In Array(Global.LeaderBoardFull, 8)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 8), Value In Array(Value In Array(Global.LeaderBoardFull, 8), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 9)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 9), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -778, Color(White), Null, Null, Visible To, Default Visibility);
                Set Global Variable At Index(LeaderBoardHuds, 8, Last Text ID);
            End;
            If(Value In Array(Global.LeaderBoardFull, 10));
                Create HUD Text((Local Player).LeaderboardToggle, Custom String("　　　　　　　　　　　　　　　　　　\n　11:　{0} - {1}　\n　12:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 10)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 10), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　13:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 11)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 11), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　14:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 12)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 12), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　15:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 13)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 13), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 14)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 14), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -777, Color(White), Null, Null, Visible To, Default Visibility);
                Set Global Variable At Index(LeaderBoardHuds, 9, Last Text ID);
            End;
            If(Value In Array(Global.LeaderBoardFull, 15));
                Create HUD Text((Local Player).LeaderboardToggle, Custom String("　　　　　　　　　　　　　　　　　　\n　16:　{0} - {1}　\n　17:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 15)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 15), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　18:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 16)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 16), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　19:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 17)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 17), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　20:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 18)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 18), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 19)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 19), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -776, Color(White), Null, Null, Visible To, Default Visibility);
                Set Global Variable At Index(LeaderBoardHuds, 10, Last Text ID);
            End;
        "if comp time run out"
        Else;
            Create HUD Text(All Players(All Teams), Custom String("　　　　 {0} Leaderboard {0} 　　　", Icon String(Flag), Null, Null), Null, Null, Top, -780, Color(Blue), Null, Null, Visible To, Default Visibility);
            Set Global Variable At Index(LeaderBoardHuds, 6, Last Text ID);
            Create HUD Text(All Players(All Teams), Custom String("　　　　　　　　　　　　　　　　　　\n　 1:　{0} - {1}　\n　 2:　{2}", If-Then-Else(First Of(Global.LeaderBoardFull), First Of(First Of(Global.LeaderBoardFull)), Custom String("", Null, Null, Null)), If-Then-Else(First Of(Global.LeaderBoardFull), Value In Array(First Of(Global.LeaderBoardFull), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 3:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 1), First Of(Value In Array(Global.LeaderBoardFull, 1)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 1), Value In Array(Value In Array(Global.LeaderBoardFull, 1), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 4:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 2), First Of(Value In Array(Global.LeaderBoardFull, 2)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 2), Value In Array(Value In Array(Global.LeaderBoardFull, 2), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 5:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 3), First Of(Value In Array(Global.LeaderBoardFull, 3)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 3), Value In Array(Value In Array(Global.LeaderBoardFull, 3), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 4), First Of(Value In Array(Global.LeaderBoardFull, 4)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 4), Value In Array(Value In Array(Global.LeaderBoardFull, 4), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -779, Color(White), Null, Null, Visible To, Visible Never);
            Set Global Variable At Index(LeaderBoardHuds, 7, Last Text ID);
            If(Value In Array(Global.LeaderBoardFull, 5));
                Create HUD Text(All Players(All Teams), Custom String("　　　　　　　　　　　　　　　　　　\n　 6:　{0} - {1}　\n　 7:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 5), First Of(Value In Array(Global.LeaderBoardFull, 5)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 5), Value In Array(Value In Array(Global.LeaderBoardFull, 5), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 8:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 6), First Of(Value In Array(Global.LeaderBoardFull, 6)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 6), Value In Array(Value In Array(Global.LeaderBoardFull, 6), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 9:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 7), First Of(Value In Array(Global.LeaderBoardFull, 7)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 7), Value In Array(Value In Array(Global.LeaderBoardFull, 7), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　10:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 8), First Of(Value In Array(Global.LeaderBoardFull, 8)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 8), Value In Array(Value In Array(Global.LeaderBoardFull, 8), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 9)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 9), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -778, Color(White), Null, Null, Visible To, Visible Never);
                Set Global Variable At Index(LeaderBoardHuds, 8, Last Text ID);
            End;
            If(Value In Array(Global.LeaderBoardFull, 10));
                Create HUD Text(All Players(All Teams), Custom String("　　　　　　　　　　　　　　　　　　\n　11:　{0} - {1}　\n　12:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 10)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 10), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　13:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 11)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 11), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　14:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 12)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 12), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　15:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 13)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 13), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 14)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 14), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -777, Color(White), Null, Null, Visible To, Visible Never);
                Set Global Variable At Index(LeaderBoardHuds, 9, Last Text ID);
            End;
            If(Value In Array(Global.LeaderBoardFull, 15));
                Create HUD Text(All Players(All Teams), Custom String("　　　　　　　　　　　　　　　　　　\n　16:　{0} - {1}　\n　17:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 15)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 15), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　18:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 16)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 16), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　19:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 17)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 17), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　20:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 18)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 18), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 19)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 19), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -776, Color(White), Null, Null, Visible To, Visible Never);
                Set Global Variable At Index(LeaderBoardHuds, 10, Last Text ID);
    }
}

rule ("SUB | Checkpoint Fail") {
    event {
        Subroutine;
        checkpointFailReset;
    }
    actions {
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Cancel Primary Action(Event Player);
        If(And(Compare((Event Player).E, <, 1), Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1))));
            Set Ability 1 Enabled(Event Player, False);
            Set Ultimate Ability Enabled(Event Player, False);
        End;
        Apply Impulse(Event Player, Down, Speed Of(Event Player), To Player, Cancel Contrary Motion);
        Set Status(Event Player, Null, Rooted, 0.1);
        Teleport(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A)));
        If(And(And(Compare(Global.deathjump, ==, True), Compare((Event Player).C, ==, 0)), Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1))));
            "if eventPlayer.isOnWall():\r\n     smallMessage(eventPlayer, \"Deathbhop is banned!\")"
            Disallow Button(Event Player, Button(Jump));
            Wait(0.1, Ignore Condition);
            Allow Button(Event Player, Button(Jump));
        End;
        If(Compare((Event Player).A, ==, 0));
            Set Player Variable(Event Player, D, 0);
        End;
        If(Is Using Ultimate(Event Player));
            Kill(Event Player, Null);
        End;
    }
}

rule ("SUB | Checkpoint Effects") {
    event {
        Subroutine;
        Sub0;
    }
    actions {
        Abort If(Compare(First Of((Event Player).B), !=, Null));
        Create Effect(If-Then-Else(Compare((Event Player).A, <=, Subtract(Count Of(Global.A), 1)), Event Player, Null), Ring, Color(Sky Blue), If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A)), 1, Visible To Position and Radius);
        Set Player Variable At Index(Event Player, B, 0, Last Created Entity);
        Create Effect(If-Then-Else(Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1)), Event Player, Null), Ring, Color(Lime Green), Value In Array(Global.A, Add((Event Player).A, 1)), 1, Visible To Position and Radius);
        Set Player Variable At Index(Event Player, B, 1, Last Created Entity);
        Create Effect(If-Then-Else(Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1)), Event Player, Null), Light Shaft, Color(White), Value In Array(Global.A, Add((Event Player).A, 1)), 1, Visible To Position and Radius);
        Set Player Variable At Index(Event Player, B, 2, Last Created Entity);
        Create Icon(If-Then-Else(Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1)), Event Player, Null), Add(Value In Array(Global.A, Add((Event Player).A, 1)), Vector(0, 1, 0)), Arrow: Down, Visible To and Position, Color(Sky Blue), True);
        Set Player Variable At Index(Event Player, B, 3, Last Created Entity);
        Create In-World Text(If-Then-Else(Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1)), Event Player, Null), Custom String("Come here", Null, Null, Null), Value In Array(Global.A, Add((Event Player).A, 1)), 1.5, Do Not Clip, Visible To Position and String, Color(White), Default Visibility);
        Set Player Variable At Index(Event Player, B, 4, Last Text ID);
    }
}

rule ("SUB | Start Game") {
    event {
        Subroutine;
        Sub1;
    }
    actions {
        If(And(Global.CompMode, Or(Compare(Global.CompTime, <, 1), (Event Player).CompDone)));
            "eventPlayer.InvincibleToggle = 1"
            Set Player Variable(Event Player, LeaderboardToggle, True);
            "eventPlayer.setUltEnabled(true)\r\neventPlayer.setUltCharge(100)\r\neventPlayer.setAbility1Enabled(true)"
            Set Player Variable(Event Player, CompDone, True);
            Disable Built-In Game Mode Respawning(Event Player);
            Kill(Event Player, Null);
            Abort;
        End;
        Call Subroutine(UpdateTitle);
        If(Is Using Ultimate(Event Player));
            Kill(Event Player, Null);
        End;
        If(Compare(Count Of(Global.A), !=, 0));
            If(Array Contains(Global.save, Custom String("{0}", Event Player, Null, Null)));
                "if \"{0}\".format(eventPlayer) in save == true:"
                Set Player Variable(Event Player, A, Value In Array(Global.save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1)));
                Set Player Variable(Event Player, D, Value In Array(Global.save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 2)));
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 3), Event Player);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 4), Total Time Elapsed);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 5), 0);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 6), 0);
                Teleport(Event Player, Add(Value In Array(Global.A, Value In Array(Global.save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1))), Vector(0, 1, 0)));
            Else;
                Teleport(Event Player, Add(First Of(Global.A), Vector(0, 1, 0)));
                Set Player Variable(Event Player, A, 0);
                Set Player Variable(Event Player, D, 0);
                Stop Chasing Player Variable(Event Player, ztjs);
                Set Player Variable(Event Player, ztjs, 0);
                Modify Global Variable(save, Append To Array, Array(Custom String("{0}", Event Player, Null, Null), (Event Player).A, (Event Player).D, Event Player, Total Time Elapsed, 0, 0));
            End;
        End;
        Chase Player Variable At Rate(Event Player, D, 9999999, 1, Destination and Rate);
        "eventPlayer.PortalText = []"
        If(And(Compare((Event Player).E, <, 1), Not((Host Player).EditorOn)));
            Set Ability 1 Enabled(Event Player, False);
            Set Ultimate Ability Enabled(Event Player, False);
        Else;
            Set Global Variable(B, If-Then-Else(Compare(Global.B, !=, -1), 0, -1));
            Set Ability 1 Enabled(Event Player, True);
            Set Ultimate Ability Enabled(Event Player, True);
            Set Ultimate Charge(Event Player, 100);
        End;
        Set Status(Event Player, Null, Phased Out, 9999);
        Set Status(Event Player, Null, Invincible, 9999);
        "ListPlayersAtCheckpoints[eventPlayer.CurrentCheckpoint].append(eventPlayer)"
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Set Player Variable(Event Player, C, 0);
        "eventPlayer.LockState = false"
        Call Subroutine(UpdateCache);
    }
}

rule ("Tittle ") {
    event {
        Subroutine;
        UpdateTitle;
    }
    actions {
        "eventPlayer.startCamera(eventPlayer.getEyePosition() + eventPlayer.getFacingDirection() * -2, eventPlayer.getEyePosition(), 10)"
        Abort If(Or(Or(Or(Or(Compare(Global.TitleData, ==, Null), Global.CompMode), Compare((Event Player).PracticeToggle, ==, 1)), (Event Player).EditorOn), Not(Array Contains(First Of(Global.TitleData), (Event Player).A))));
        Destroy In-World Text((Event Player).TitleStore);
        Create In-World Text(If-Then-Else((Event Player).invis, Null, All Players(All Teams)), Value In Array(Value In Array(Global.TitleData, 1), Index Of Array Value(First Of(Global.TitleData), (Event Player).A)), Event Player, 1.1, Clip Against Surfaces, Visible To and Position, Value In Array(Value In Array(Global.TitleData, 2), Index Of Array Value(First Of(Global.TitleData), (Event Player).A)), Default Visibility);
        Set Player Variable(Event Player, TitleStore, Last Text ID);
    }
}

rule ("SUB | Leaderboard Update") {
    event {
        Subroutine;
        Leaderboardupdate;
    }
    actions {
        Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
        Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
        Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
        Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
        Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
        Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
        Modify Global Variable(save, Remove From Array By Value, Custom String("{0}", Event Player, Null, Null));
        "[i[0] for i in var1]   list of first element of each in var 1\r\n [ [name, seconds, prettytime] ]\r\n you already have a time"
        If(Array Contains(Mapped Array(Global.LeaderBoardFull, First Of(Current Array Element)), Custom String("{0}", Event Player, Null, Null)));
            "new time worse"
            If(Compare((Event Player).D, >, Value In Array(First Of(Filtered Array(Global.LeaderBoardFull, Compare(First Of(Current Array Element), ==, Custom String("{0}", Event Player, Null, Null)))), 1)));
                Skip(19);
            "new time better"
            Else;
                Modify Global Variable(LeaderBoardFull, Remove From Array By Value, Filtered Array(Global.LeaderBoardFull, Compare(First Of(Current Array Element), ==, Custom String("{0}", Event Player, Null, Null))));
                Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player, Null, Null), (Event Player).D, Custom String("{0} sec", (Event Player).D, Null, Null))));
                "async(CreateLeaderBoard(), AsyncBehavior.RESTART)"
                Call Subroutine(CreateLeaderBoard);
            End;
        "you are not in list yet"
        Else;
            "board has room for more"
            If(Compare(Count Of(Global.LeaderBoardFull), <, 20));
                Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player, Null, Null), (Event Player).D, Custom String("{0} sec", (Event Player).D, Null, Null))));
                "async(CreateLeaderBoard(), AsyncBehavior.RESTART)"
                Call Subroutine(CreateLeaderBoard);
            "20 entries already"
            Else;
                "your time lower then last entry"
                If(Compare(Value In Array(Value In Array(Global.LeaderBoardFull, 19), 1), <, (Event Player).D));
                    Skip(7);
                "you beat the last entry, thus replacing it"
                Else;
                    Modify Global Variable(LeaderBoardFull, Remove From Array By Index, 19);
                    Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player, Null, Null), (Event Player).D, Custom String("{0} sec", (Event Player).D, Null, Null))));
                    "async(CreateLeaderBoard(), AsyncBehavior.RESTART)"
                    Call Subroutine(CreateLeaderBoard);
                End;
            End;
        End;
    }
}

rule ("SUB | Kill Orb Effects") {
    event {
        Subroutine;
        KILLBALL;
    }
    actions {
        Abort If(Or(Compare(Global.H, ==, Empty Array), Compare((Host Player).EditorOn, ==, True)));
        For Global Variable(NANBA, 0, Count Of(Global.H), 1);
            Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null), Compare((Current Array Element).A, ==, Value In Array(Global.killballnumber, Evaluate Once(Global.NANBA)))), Sphere, Color(Blue), Value In Array(Global.H, Evaluate Once(Global.NANBA)), Value In Array(Global.I, Evaluate Once(Global.NANBA)), Visible To);
            Modify Global Variable(K, Append To Array, Last Created Entity);
            Wait(0.016, Ignore Condition);
        End;
    }
}

rule ("SUB | Bounce Ball Effects") {
    event {
        Subroutine;
        pinball;
    }
    actions {
        Abort If(Or(Compare(Global.TQ, ==, Empty Array), Compare((Host Player).EditorOn, ==, True)));
        For Global Variable(NANBA, 0, Count Of(Global.TQ), 1);
            Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null), And(Compare((Current Array Element).A, ==, Value In Array(Global.pinballnumber, Evaluate Once(Global.NANBA))), Not(Array Contains((Current Array Element).LockCollected, Value In Array(Global.TQ, Evaluate Once(Global.NANBA)))))), Orb, If-Then-Else(Value In Array(Global.BounceToggleLock, Global.NANBA), Color(Orange), Color(Green)), Value In Array(Global.TQ, Evaluate Once(Global.NANBA)), 1, Visible To);
            Modify Global Variable(TQ2, Append To Array, Last Created Entity);
            Wait(0.016, Ignore Condition);
        End;
    }
}

rule ("Checkpoint | Arrived") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is On Ground(Event Player) == True;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        Distance Between(Event Player, Value In Array(Global.A, Add((Event Player).A, 1))) <= 1.4;
        Or(Compare((Event Player).E, >=, 1), Compare((Event Player).C, ==, 0)) == True;
        (Event Player).LockState == False;
        Or(Compare(Global.CompMode, ==, False), Compare(Global.CompTime, >, 0)) == True;
    }
    actions {
        Set Player Variable(Event Player, MovedCheckpoint, True);
        "kill player if not colleted the locks"
        If((Event Player).BounceLockMax_Cache);
            If(Compare(Count Of((Event Player).LockCollected), <, (Event Player).BounceLockMax_Cache));
                Small Message(Event Player, Custom String("   ! collect ALL orange orbs to unlock !", Null, Null, Null));
                Kill(Event Player, Null);
                Abort;
            End;
        End;
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Modify Player Variable(Event Player, A, Add, 1);
        Call Subroutine(UpdateCache);
        Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
        Play Effect(If-Then-Else(Or(Global.CompMode, (Event Player).invis), Event Player, All Players(All Teams)), Ring Explosion, Color(Sky Blue), Add(Value In Array(Global.A, (Event Player).A), Vector(0, 1.5, 0)), 4);
        Big Message(Event Player, Custom String("{0} {1}", Custom String("Arrived at", Null, Null, Null), Custom String("{0} / {1}", (Event Player).A, Subtract(Count Of(Global.A), 1), Null), Null));
        Call Subroutine(UpdateTitle);
        If(Compare((Event Player).PracticeToggle, ==, 1));
            Modify Player Variable(Event Player, PracticeCheckpoint, Add, 1);
            Skip If(Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1)), 41);
            Skip If(Compare((Event Player).A, >=, Subtract(Count Of(Global.A), 1)), 10);
        "normal cp, but also runs when completed"
        Else;
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Value, Custom String("{0}", Event Player, Null, Null));
            Modify Global Variable(save, Append To Array, Array(Custom String("{0}", Event Player, Null, Null), (Event Player).A, (Event Player).D, Event Player, Total Time Elapsed, 0, 0));
        End;
        If(Compare((Event Player).E, <, 1));
            Set Ultimate Ability Enabled(Event Player, False);
            Set Ability 1 Enabled(Event Player, False);
        End;
        Abort If(Compare((Event Player).E, >=, 1));
        "complete lvl"
        If(Compare((Event Player).A, >=, Subtract(Count Of(Global.A), 1)));
            Set Ability 1 Enabled(Event Player, True);
            If(Compare((Event Player).PracticeToggle, !=, 1));
                Set Ultimate Ability Enabled(Event Player, True);
                Set Ultimate Charge(Event Player, 100);
                Stop Chasing Player Variable(Event Player, D);
                Big Message(All Players(All Teams), Custom String("{0} {1}", Event Player, Custom String("Mission complete! Time {0}", Custom String("{0} sec", (Event Player).D, Null, Null), Null, Null), Null));
                Set Player Variable(Event Player, H, 2);
                Call Subroutine(Leaderboardupdate);
                If(Global.CompMode);
                    If(Compare(Global.CompAtmpNum, >, 0));
                        If(Compare((Event Player).AttemptCount, ==, Global.CompAtmpNum));
                            Set Global Variable At Index(CompAtmpSaveCount, Index Of Array Value(Global.CompAtmpSaveNames, Custom String("{0}", Event Player, Null, Null)), -1);
                            Set Player Variable(Event Player, AttemptCount, -1);
                            Set Player Variable(Event Player, CompDone, True);
                            Set Player Variable(Event Player, LeaderboardToggle, True);
                            Disable Built-In Game Mode Respawning(Event Player);
                            Kill(Event Player, Null);
                        Else;
                            Set Global Variable At Index(CompAtmpSaveCount, Index Of Array Value(Global.CompAtmpSaveNames, Custom String("{0}", Event Player, Null, Null)), Add((Event Player).AttemptCount, 1));
                        End;
                    End;
                End;
            End;
        End;
    }
}

rule ("Checkpoint | Finish effects") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).A == Subtract(Count Of(Global.A), 1);
        (Event Player).E < 1;
        Is Moving(Event Player) == True;
        (Event Player).TracesOff == False;
        (Event Player).PracticeToggle != 1;
        Global.CompMode == False;
    }
    actions {
        "@Condition (eventPlayer.isMoving() == true or eventPlayer.isHoldingButton(Button.JUMP) == true) == true\r\n rgb((cosDeg(modeList * 360 - 0) + 0.5) * 255, (cosDeg(modeList * 360 - 120) + 0.5) * 255, (cosDeg(modeList * 360 - 240) + 0.5) * 255)"
        Play Effect(All Players(All Teams), Ring Explosion, Custom Color(Multiply(Add(Cosine From Degrees(Multiply(Divide(Total Time Elapsed, 2), 360)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 120)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 240)), 0.5), 255), 255), Position Of(Event Player), 1.6);
        Play Effect(All Players(All Teams), Ring Explosion, Custom Color(Multiply(Add(Cosine From Degrees(Multiply(Divide(Total Time Elapsed, 2), 360)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 120)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 240)), 0.5), 255), 255), Position Of(Event Player), 1.4);
        Play Effect(All Players(All Teams), Ring Explosion, Custom Color(Multiply(Add(Cosine From Degrees(Multiply(Divide(Total Time Elapsed, 2), 360)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 120)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 240)), 0.5), 255), 255), Position Of(Event Player), 1.2);
        Play Effect(All Players(All Teams), Ring Explosion, Custom Color(Multiply(Add(Cosine From Degrees(Multiply(Divide(Total Time Elapsed, 2), 360)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 120)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 240)), 0.5), 255), 255), Position Of(Event Player), 1);
        Play Effect(All Players(All Teams), Ring Explosion, Custom Color(Multiply(Add(Cosine From Degrees(Multiply(Divide(Total Time Elapsed, 2), 360)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 120)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 240)), 0.5), 255), 255), Position Of(Event Player), 0.8);
        Play Effect(All Players(All Teams), Ring Explosion, Custom Color(Multiply(Add(Cosine From Degrees(Multiply(Divide(Total Time Elapsed, 2), 360)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 120)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 240)), 0.5), 255), 255), Position Of(Event Player), 0.6);
        Play Effect(All Players(All Teams), Ring Explosion, Custom Color(Multiply(Add(Cosine From Degrees(Multiply(Divide(Total Time Elapsed, 2), 360)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 120)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 240)), 0.5), 255), 255), Position Of(Event Player), 0.4);
        Play Effect(All Players(All Teams), Ring Explosion, Custom Color(Multiply(Add(Cosine From Degrees(Multiply(Divide(Total Time Elapsed, 2), 360)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 120)), 0.5), 255), Multiply(Add(Cosine From Degrees(Subtract(Multiply(Divide(Total Time Elapsed, 2), 360), 240)), 0.5), 255), 255), Position Of(Event Player), 0.2);
        Wait(0.34, Ignore Condition);
        Loop If Condition Is True;
    }
}

rule ("Preview orbs/portals") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        (Event Player).E < 1;
        Is Button Held(Event Player, Button(Primary Fire)) == True;
        Is Button Held(Event Player, Button(Crouch)) == False;
    }
    actions {
        Wait(0.9, Abort When False);
        Set Player Variable(Event Player, PreviewsArray, Filtered Array(Global.CustomPortalStart, Compare(Value In Array(Global.CustomPortalCP, Index Of Array Value(Global.CustomPortalStart, Current Array Element)), ==, (Event Player).A)));
        Modify Player Variable(Event Player, PreviewsArray, Append To Array, Filtered Array(Global.TQ, And(Compare(Value In Array(Global.pinballnumber, Index Of Array Value(Global.TQ, Current Array Element)), ==, (Event Player).A), Compare(Value In Array(Global.BounceToggleLock, Index Of Array Value(Global.TQ, Current Array Element)), ==, True))));
        "test if this doesnt mes up with empty thigns being apended"
        If(Or(Compare(Count Of((Event Player).PreviewsArray), <, 1), Compare((Event Player).PreviewsArray, ==, Null)));
            Wait(0.016, Ignore Condition);
            Abort;
        End;
        Set Move Speed(Event Player, 0);
        Set Player Variable(Event Player, PreviewsI, 0);
        Start Camera(Event Player, Add(Value In Array((Event Player).PreviewsArray, (Event Player).PreviewsI), Multiply(Facing Direction Of(Event Player), -3.5)), Value In Array((Event Player).PreviewsArray, (Event Player).PreviewsI), 15);
        While(And(Is Button Held(Event Player, Button(Primary Fire)), Is Alive(Event Player)));
            If(Compare(X Component Of(Throttle Of(Event Player)), <, -0.5));
                If(Compare(Add((Event Player).PreviewsI, 1), >=, Count Of((Event Player).PreviewsArray)));
                    Set Player Variable(Event Player, PreviewsI, 0);
                Else;
                    Modify Player Variable(Event Player, PreviewsI, Add, 1);
                End;
                Wait Until(Compare(X Component Of(Throttle Of(Event Player)), >, -0.5), 1);
            Else If(Compare(X Component Of(Throttle Of(Event Player)), >, 0.5));
                If(Compare((Event Player).PreviewsI, >, 0));
                    Modify Player Variable(Event Player, PreviewsI, Subtract, 1);
                Else;
                    Set Player Variable(Event Player, PreviewsI, Subtract(Count Of((Event Player).PreviewsArray), 1));
                End;
                Wait Until(Compare(X Component Of(Throttle Of(Event Player)), <, 0.5), 1);
            End;
            Wait(0.016, Ignore Condition);
        End;
        Stop Camera(Event Player);
        Set Move Speed(Event Player, 100);
    }
}

rule ("Toggle Traces") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Ultimate)) == True;
        (Event Player).A == Subtract(Count Of(Global.A), 1);
        (Event Player).E < 1;
        (Event Player).PracticeToggle != 1;
        Global.CompMode == False;
    }
    actions {
        Wait(1, Abort When False);
        Set Player Variable(Event Player, TracesOff, Not((Event Player).TracesOff));
        Play Effect(Event Player, Buff Impact Sound, Null, Event Player, 100);
        Small Message(Event Player, Custom String("   Traces {0}", If-Then-Else((Event Player).TracesOff, Custom String("off", Null, Null, Null), Custom String("on", Null, Null, Null)), Null, Null));
        Play Effect(Event Player, Debuff Impact Sound, Null, Event Player, 100);
    }
}

rule ("Kill Orb | Activate") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        "@Condition eventPlayer.CurrentCheckpoint != 0"
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        (Event Player).C == 0;
        "@Condition (KillballCheckpoints[KillBallPositions.index(([player for player in KillBallPositions if distance(eventPlayer, player) <= KillBallRadii[KillBallPositions.index(player)]])[0])] == eventPlayer.CurrentCheckpoint or KillballCheckpoints[KillBallPositions.index(([player for player in KillBallPositions if distance(eventPlayer, player) <= KillBallRadii[KillBallPositions.index(player)]])[1])] == eventPlayer.CurrentCheckpoint or KillballCheckpoints[KillBallPositions.index(([player for player in KillBallPositions if distance(eventPlayer, player) <= KillBallRadii[KillBallPositions.index(player)]])[2])] == eventPlayer.CurrentCheckpoint or KillballCheckpoints[KillBallPositions.index(([player for player in KillBallPositions if distance(eventPlayer, player) <= KillBallRadii[KillBallPositions.index(player)]])[3])] == eventPlayer.CurrentCheckpoint) == true"
        (Event Player).KillPosition_Cache != Empty Array;
        Is True For Any((Event Player).KillPosition_Cache, Compare(Distance Between(Current Array Element, Event Player), <=, Value In Array((Event Player).KillRadii_Cache, Index Of Array Value((Event Player).KillPosition_Cache, Current Array Element)))) == True;
    }
    actions {
        "kill(eventPlayer, null)"
        Call Subroutine(checkpointFailReset);
    }
}

rule ("Bounce Ball | Activate") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        "@Condition eventPlayer.CurrentCheckpoint != 0"
        (Event Player).BouncePosition_Cache != Empty Array;
        Is True For Any((Event Player).BouncePosition_Cache, Compare(Distance Between(Current Array Element, Event Player), <, 1.4)) == True;
    }
    actions {
        Set Player Variable(Event Player, bouncetouched, Index Of Array Value((Event Player).BouncePosition_Cache, First Of(Sorted Array(Filtered Array((Event Player).BouncePosition_Cache, And(Compare(Distance Between(Event Player, Current Array Element), <, 1.4), Not(Array Contains((Event Player).LockCollected, Current Array Element)))), Distance Between(Event Player, Current Array Element)))));
        "eventPlayer.applyImpulse(Vector.UP, BounceStrength[BouncePositions.index([player for player in BouncePositions if distance(eventPlayer.getPosition(), player) <= 2])], Relativity.TO_WORLD, Impulse.CANCEL_CONTRARY_MOTION)"
        If(Compare(Value In Array((Event Player).BounceStrength_Cache, (Event Player).bouncetouched), !=, 0));
            Apply Impulse(Event Player, Up, Value In Array((Event Player).BounceStrength_Cache, (Event Player).bouncetouched), To World, Cancel Contrary Motion);
        End;
        "if BounceToggleDash[BouncePositions.index([player for player in BouncePositions if distance(eventPlayer.getPosition(), player) <= 2])] == true:"
        If(Value In Array((Event Player).BounceDash_Cache, (Event Player).bouncetouched));
            Set Ability 1 Enabled(Event Player, True);
            Small Message(Event Player, Custom String("   Dash is ready", Null, Null, Null));
            Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
        End;
        "if BounceToggleUlt[BouncePositions.index([player for player in BouncePositions if distance(eventPlayer.getPosition(), player) <= 2])] == true:"
        If(Value In Array((Event Player).BounceUlt_Cache, (Event Player).bouncetouched));
            Set Ultimate Ability Enabled(Event Player, True);
            Set Ultimate Charge(Event Player, 100);
            Small Message(Event Player, Custom String("   Ultimate is ready", Null, Null, Null));
            Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
        End;
        "if BounceToggleLock[BouncePositions.index([player for player in BouncePositions if distance(eventPlayer.getPosition(), player) <= 2])] == true:"
        If(Value In Array((Event Player).BounceLock_Cache, (Event Player).bouncetouched));
            Modify Player Variable(Event Player, LockCollected, Append To Array, Value In Array((Event Player).BouncePosition_Cache, (Event Player).bouncetouched));
            Small Message(Event Player, Custom String("   orb has been collected", Null, Null, Null));
            Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
    }
}

rule ("Death Reset") {
    event {
        Player Died;
        All;
        All;
    }
    conditions {
        (Event Player).F != 1;
        Count Of(Global.A) >= 2;
        (Event Player).CompDone == False;
    }
    actions {
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Clear Status(Event Player, Phased Out);
        Resurrect(Event Player);
        Teleport(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A)));
    }
}

rule ("Ground Reset") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        Count Of(Global.A) >= 2;
        (Event Player).C == 0;
        (Event Player).F != 1;
        Is On Ground(Event Player) == True;
        (Event Player).LockState == False;
        Distance Between(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A))) > 1.4;
    }
    actions {
        Call Subroutine(checkpointFailReset);
    }
}

rule ("Player Effect") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Alive(Event Player) == True;
        Has Status(Event Player, Phased Out) == False;
    }
    actions {
        Set Status(Event Player, Null, Phased Out, 9999);
        Set Status(Event Player, Null, Invincible, 9999);
    }
}

rule ("Ultimate Charge") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Ultimate Charge Percent(Event Player) < 100;
    }
    actions {
        Set Ultimate Charge(Event Player, 100);
    }
}

rule ("Player Leaves") {
    event {
        Player Left Match;
        All;
        All;
    }
    actions {
        "if player's cur_checkpoint is 0, delete save info"
        If(Compare(Value In Array(Global.save, Subtract(Index Of Array Value(Global.save, Event Player), 2)), ==, 0));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Event Player), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Event Player), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Event Player), 1));
            Modify Global Variable(save, Remove From Array By Index, Subtract(Index Of Array Value(Global.save, Event Player), 1));
            Modify Global Variable(save, Remove From Array By Index, Subtract(Index Of Array Value(Global.save, Event Player), 1));
            Modify Global Variable(save, Remove From Array By Index, Subtract(Index Of Array Value(Global.save, Event Player), 1));
            Modify Global Variable(save, Remove From Array By Value, Event Player);
        Else;
            Skip If(Compare(Value In Array(Global.save, Subtract(Index Of Array Value(Global.save, Event Player), 2)), >=, Subtract(Count Of(Global.A), 1)), 2);
            Skip If(Compare(Value In Array(Global.save, Add(Index Of Array Value(Global.save, Event Player), 3)), ==, 1), 1);
            Set Global Variable At Index(save, Subtract(Index Of Array Value(Global.save, Event Player), 1), Add(Subtract(Subtract(Total Time Elapsed, Value In Array(Global.save, Add(Index Of Array Value(Global.save, Event Player), 1))), Value In Array(Global.save, Add(Index Of Array Value(Global.save, Event Player), 2))), Value In Array(Global.save, Subtract(Index Of Array Value(Global.save, Event Player), 1))));
            Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Event Player), 2), 0);
            Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Event Player), 3), 0);
    }
}

rule ("Combo | Leaderboard Toggle | Melee toggle") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Melee)) == True;
        (Event Player).E < 1;
    }
    actions {
        "@Condition CompMode == false or not eventPlayer.CompDone"
        Wait(1, Abort When False);
        Set Player Variable(Event Player, LeaderboardToggle, Not((Event Player).LeaderboardToggle));
    }
}

rule ("Combo | Restart Run | Crouch + Interact + Deflect") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Crouch)) == True;
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Ability 2)) == True;
    }
    actions {
        "@Condition eventPlayer.isUsingAbility1() == false if DashExploitToggle else true"
        If(Global.CompMode);
            If(Compare(Global.CompTime, <, 1));
                Small Message(Event Player, Custom String("   The competition is over", Null, Null, Null));
                Wait(0.016, Ignore Condition);
                Abort;
            End;
            If((Event Player).CompDone);
                Wait(0.016, Ignore Condition);
                Abort;
            End;
            If(And(Global.CompRestartLimit, Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1))));
                Small Message(Event Player, Custom String("   Restart during run is disabled for this competition", Null, Null, Null));
                Wait(0.016, Ignore Condition);
                Abort;
            End;
            If(Compare(Global.CompAtmpNum, >, 0));
                If(Compare((Event Player).AttemptCount, ==, Global.CompAtmpNum));
                    Small Message(Event Player, Custom String("   You are on your last attempt", Null, Null, Null));
                    Wait(0.016, Ignore Condition);
                    Abort;
                End;
                If(Compare((Event Player).AttemptCount, ==, -1));
                    Small Message(Event Player, Custom String("   You are out of attempts", Null, Null, Null));
                    Wait(0.016, Ignore Condition);
                    Abort;
                End;
                Modify Player Variable(Event Player, AttemptCount, Add, 1);
                Set Global Variable At Index(CompAtmpSaveCount, Index Of Array Value(Global.CompAtmpSaveNames, Custom String("{0}", Event Player, Null, Null)), (Event Player).AttemptCount);
            End;
        End;
        Set Player Variable(Event Player, LockState, True);
        If(And(Global.DashExploitToggle, Is Using Ability 1(Event Player)));
            Small Message(Event Player, Custom String("   Dash Start is banned!", Null, Null, Null));
            Cancel Primary Action(Event Player);
            Wait Until(Is On Ground(Event Player), 0.6);
            Set Player Variable(Event Player, LockState, False);
            Abort;
        End;
        Set Player Variable(Event Player, flytoggle, Null);
        Set Player Variable(Event Player, A, 0);
        Set Player Variable(Event Player, PracticeToggle, 0);
        Set Player Variable(Event Player, PracticeCheckpoint, 0);
        Set Player Variable(Event Player, C, 0);
        If(Array Contains(Global.save, Custom String("{0}", Event Player, Null, Null)));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Index, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 1));
            Modify Global Variable(save, Remove From Array By Value, Custom String("{0}", Event Player, Null, Null));
        End;
        Call Subroutine(Sub1);
        Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
        Wait(0.016, Ignore Condition);
        Set Player Variable(Event Player, LockState, False);
        If(Global.CompMode);
            Wait(1, Ignore Condition);
        Else;
            Wait(0.016, Ignore Condition);
    }
}

rule ("Combo | Enter Spectate | Hold Interact") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Ability 2)) == False;
        (Event Player).E < 1;
        Global.CompMode == False;
    }
    actions {
        Wait(1, Abort When False);
        Small Message(Event Player, Custom String("   Hold Interact again to turn off spectate mode", Null, Null, Null));
        If(Is Alive(Event Player));
            If(Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1)));
                Chase Player Variable At Rate(Event Player, ztjs, 999999, 1, Destination and Rate);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 2), (Event Player).D);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 4), Total Time Elapsed);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 6), 1);
            End;
            Set Respawn Max Time(Event Player, 9999);
            Set Player Variable(Event Player, F, 1);
            Stop Chasing Player Variable(Event Player, D);
            Wait(0.2, Ignore Condition);
            Kill(Event Player, Null);
            Teleport(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A)));
        Else;
            Skip If(Compare((Event Player).E, >=, 1), 2);
            Respawn(Event Player);
            Set Player Variable(Event Player, F, 0);
            Teleport(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A)));
            Skip If(Compare((Event Player).A, >=, Subtract(Count Of(Global.A), 1)), 4);
            Set Ultimate Ability Enabled(Event Player, False);
            Set Ability 1 Enabled(Event Player, False);
            Skip If(Compare((Event Player).PracticeToggle, ==, 1), 1);
            Chase Player Variable At Rate(Event Player, D, 10000, 1, Destination and Rate);
            Set Respawn Max Time(Event Player, 0);
            Set Player Variable(Event Player, C, 0);
            Set Player Variable(Event Player, LockCollected, Empty Array);
            If(Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1)));
                Stop Chasing Player Variable(Event Player, ztjs);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 5), (Event Player).ztjs);
                Set Player Variable(Event Player, ztjs, 0);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 6), 0);
    }
}

rule ("Combo | Toggle Invincible Mode | Melee + Rel﻿oad") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Melee)) == True;
        Is Button Held(Event Player, Button(Reload)) == True;
        Is Using Ability 1(Event Player) == False;
        "@Condition eventPlayer.CurrentCheckpoint < len(CheckpointPositions) - 1"
        Is Alive(Event Player) == True;
        Is Using Ultimate(Event Player) == False;
        Or(Compare(Global.CompMode, ==, False), Not((Event Player).CompDone)) == True;
    }
    actions {
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Set Player Variable(Event Player, flytoggle, Null);
        If(Compare((Event Player).C, ==, 0));
            Abort If(Compare((Event Player).A, >=, Subtract(Count Of(Global.A), 1)));
            Chase Player Variable At Rate(Event Player, ztjs, 999999, 1, Destination and Rate);
            Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 2), (Event Player).D);
            Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 4), Total Time Elapsed);
            Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 6), 1);
            Stop Chasing Player Variable(Event Player, D);
            Big Message(Event Player, Custom String("Invincible mode", Null, Null, Null));
            Set Player Variable(Event Player, flytoggle, Null);
            Set Ultimate Ability Enabled(Event Player, True);
            Set Ultimate Charge(Event Player, 100);
            Set Ability 1 Enabled(Event Player, True);
            Wait(0.2, Ignore Condition);
            Set Player Variable(Event Player, C, 1);
        Else;
            Start Forcing Player Position(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A)), True);
            Skip If(Compare((Event Player).E, >=, 1), 2);
            Set Ultimate Ability Enabled(Event Player, False);
            Set Ability 1 Enabled(Event Player, False);
            Teleport(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A)));
            Wait(0.1, Ignore Condition);
            Set Player Variable(Event Player, C, 0);
            If(Compare((Event Player).PracticeToggle, ==, 1));
                Big Message(Event Player, Custom String("Practice mode", Null, Null, Null));
            Else;
                Big Message(Event Player, Custom String("Normal mode", Null, Null, Null));
                Chase Player Variable At Rate(Event Player, D, 9999999, 1, Destination and Rate);
                Stop Chasing Player Variable(Event Player, ztjs);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 5), (Event Player).ztjs);
                Set Player Variable(Event Player, ztjs, 0);
                Set Global Variable At Index(save, Add(Index Of Array Value(Global.save, Custom String("{0}", Event Player, Null, Null)), 6), 0);
            End;
            Stop Forcing Player Position(Event Player);
            Set Player Variable(Event Player, flytoggle, Null);
    }
}

rule ("Combo | Toggle Practice Mode | Melee + Ultimate") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Melee)) == True;
        Is Button Held(Event Player, Button(Ultimate)) == True;
        (Event Player).E < 1;
        Is Using Ability 1(Event Player) == False;
        (Event Player).A <= Subtract(Count Of(Global.A), 1);
        "@Condition eventPlayer.InvincibleToggle != 1"
        Is Alive(Event Player) == True;
        Global.CompMode == False;
    }
    actions {
        If(Compare((Event Player).C, ==, 1));
            Small Message(Event Player, Custom String("   Cannot leave practice mode while also in invincible mode", Null, Null, Null));
            Wait(0.016, Ignore Condition);
            Abort;
        End;
        Set Player Variable(Event Player, LockState, True);
        "waitUntil(eventPlayer.isUsingUltimate() == false or eventPlayer.PracticeToggle == 0, 3)"
        If(Is Using Ultimate(Event Player));
            Kill(Event Player, Null);
        End;
        Wait(0.16, Ignore Condition);
        Set Player Variable(Event Player, LockCollected, Empty Array);
        If(Compare((Event Player).PracticeToggle, ==, 0));
            Start Forcing Player Position(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), ==, 0), Value In Array(Global.A, (Event Player).A), Value In Array(Value In Array(Global.A, (Event Player).A), 1)), True);
            Stop Chasing Player Variable(Event Player, D);
            Big Message(Event Player, Custom String("Practice mode", Null, Null, Null));
            Stop Forcing Player Position(Event Player);
            Wait(0.2, Ignore Condition);
            Set Player Variable(Event Player, PracticeToggle, 1);
        Else;
            Start Forcing Player Position(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, Subtract((Event Player).A, (Event Player).PracticeCheckpoint))), ==, 0), Value In Array(Global.A, Subtract((Event Player).A, (Event Player).PracticeCheckpoint)), Value In Array(Value In Array(Global.A, Subtract((Event Player).A, (Event Player).PracticeCheckpoint)), 1)), True);
            Call Subroutine(checkpointFailReset);
            Set Ability 1 Enabled(Event Player, False);
            Modify Player Variable(Event Player, A, Subtract, (Event Player).PracticeCheckpoint);
            Set Player Variable(Event Player, PracticeCheckpoint, 0);
            Wait(0.1, Ignore Condition);
            Set Player Variable(Event Player, PracticeToggle, 0);
            Big Message(Event Player, Custom String("Normal mode", Null, Null, Null));
            If(Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1)));
                Chase Player Variable At Rate(Event Player, D, 9999999, 1, Destination and Rate);
            Else;
                Set Ultimate Ability Enabled(Event Player, True);
                Set Ultimate Charge(Event Player, 100);
                Set Ability 1 Enabled(Event Player, True);
            End;
            Stop Forcing Player Position(Event Player);
        End;
        Wait(0.3, Ignore Condition);
        Set Player Variable(Event Player, LockState, False);
    }
}

rule ("Combo | Practice Restart | Interact") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Ultimate)) == False;
        Is Button Held(Event Player, Button(Melee)) == False;
        Or(Is Alive(Event Player), Compare((Event Player).F, !=, 0)) == True;
        Is Button Held(Event Player, Button(Crouch)) == False;
        Is Button Held(Event Player, Button(Ability 2)) == False;
        (Event Player).E < 1;
        (Event Player).PracticeToggle != False;
    }
    actions {
        "@Condition eventPlayer.SpectateToggle != 1\r\n@Condition eventPlayer.CurrentCheckpoint - eventPlayer.PracticeCheckpoint <= 0 == true"
        If(Compare((Event Player).F, !=, 0));
            Wait Until(Is Alive(Event Player), 9999);
            Wait Until(Not(Is Button Held(Event Player, Button(Interact))), 2);
            Abort;
        End;
        Wait Until(Not(Is Button Held(Event Player, Button(Interact))), 0.9);
        Abort If(Is Button Held(Event Player, Button(Interact)));
        Set Player Variable(Event Player, LockCollected, Empty Array);
        If(Is Using Ultimate(Event Player));
            Kill(Event Player, Null);
        End;
        If(Compare((Event Player).A, >=, Subtract(Count Of(Global.A), 1)));
            Call Subroutine(Sub0);
        End;
        Teleport(Event Player, Value In Array(Global.A, Subtract((Event Player).A, (Event Player).PracticeCheckpoint)));
        "broken\r\neventPlayer.PracticeCheckpoint = eventPlayer.CurrentCheckpoint"
        Modify Player Variable(Event Player, A, Subtract, (Event Player).PracticeCheckpoint);
        "broken\r\neventPlayer.teleport(CheckpointPositions[eventPlayer.CurrentCheckpoint])"
        Set Player Variable(Event Player, PracticeCheckpoint, 0);
        Set Status(Event Player, Null, Rooted, 0.2);
    }
}

rule ("Combo | Quick Reset | Rel﻿oad, Hold Rel﻿oad to Enable") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Reload)) == True;
    }
    actions {
        "@Condition eventPlayer.EditModeSelection < 1"
        Abort If(Is Button Held(Event Player, Button(Melee)));
        If(Compare((Event Player).quick_restart, ==, True));
            Set Player Variable(Event Player, LockCollected, Empty Array);
            If(Is Using Ultimate(Event Player));
                Kill(Event Player, Null);
            End;
            Start Forcing Player Position(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A)), True);
            Set Player Variable(Event Player, flytoggle, Null);
            Skip If(Or(Or(Compare((Event Player).E, >=, 1), Compare((Event Player).C, ==, 1)), Compare((Event Player).A, >=, Subtract(Count Of(Global.A), 1))), 2);
            Set Ultimate Ability Enabled(Event Player, False);
            Set Ability 1 Enabled(Event Player, False);
            Teleport(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), !=, 0), Value In Array(Value In Array(Global.A, (Event Player).A), 1), Value In Array(Global.A, (Event Player).A)));
            Wait(0.1, Ignore Condition);
            Stop Forcing Player Position(Event Player);
            Set Player Variable(Event Player, flytoggle, Null);
        End;
        Wait(1, Abort When False);
        If(Compare((Event Player).quick_restart, ==, False));
            Set Player Variable(Event Player, quick_restart, True);
            Big Message(Event Player, Custom String("Quick reset is enabled", Null, Null, Null));
            Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
        Else If(Compare((Event Player).quick_restart, ==, True));
            Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
            Set Player Variable(Event Player, quick_restart, False);
            Big Message(Event Player, Custom String("Quick reset is disabled", Null, Null, Null));
    }
}

rule ("Combo | Invisible Toggle | Hold Deflect") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Ability 2)) == True;
        (Event Player).E < 1;
        Global.CompMode == False;
    }
    actions {
        Wait(1, Abort When False);
        Set Player Variable(Event Player, invis, Not((Event Player).invis));
        Set Invisible(Event Player, None);
        If((Event Player).invis);
            Set Invisible(Event Player, All);
        End;
        Small Message(Event Player, Custom String("   Invisible {0}", If-Then-Else((Event Player).invis, Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)), Null, Null));
        Play Effect(Event Player, Debuff Impact Sound, Null, Event Player, 100);
    }
}

rule ("Limit Ultimate") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        "The function of this rule is: ULT can only be used once when running the map"
        Is Using Ultimate(Event Player) == True;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        (Event Player).E < 1;
        (Event Player).C == 0;
    }
    actions {
        Set Ultimate Ability Enabled(Event Player, False);
    }
}

rule ("Limit Dash") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        "The function of this rule is: DASH can only be used once when running the map"
        Is Using Ability 1(Event Player) == True;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        (Event Player).E < 1;
        (Event Player).C == 0;
    }
    actions {
        Set Ability 1 Enabled(Event Player, False);
    }
}

rule ("Give Blade") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is On Ground(Event Player) == True;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        Array Contains(Global.Dao, (Event Player).A) == True;
        Distance Between(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), >, 1), Last Of(Value In Array(Global.A, (Event Player).A)), Value In Array(Global.A, (Event Player).A))) <= 1.4;
        Is Using Ultimate(Event Player) == False;
    }
    actions {
        Wait(0.1, Ignore Condition);
        Abort If(Is Using Ultimate(Event Player));
        Set Ultimate Ability Enabled(Event Player, True);
        Set Ultimate Charge(Event Player, 100);
        Small Message(Event Player, Custom String("   Ultimate is ready", Null, Null, Null));
    }
}

rule ("Give Dash") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is On Ground(Event Player) == True;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        "@Condition distance(eventPlayer, A[eventPlayer.A]) <= 1.4"
        Array Contains(Global.SHIFT, (Event Player).A) == True;
        Distance Between(Event Player, If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), >, 1), Last Of(Value In Array(Global.A, (Event Player).A)), Value In Array(Global.A, (Event Player).A))) <= 1.4;
        Is Using Ability 1(Event Player) == False;
    }
    actions {
        Set Ability 1 Enabled(Event Player, True);
        Small Message(Event Player, Custom String("   Dash is ready", Null, Null, Null));
    }
}

rule ("Checkpoint | Skip | Crouch + Primary/Secondary Fire") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).LockState == False;
        Or((Host Player).EditorOn, Compare((Event Player).PracticeToggle, ==, 1)) == True;
        Is Button Held(Event Player, Button(Crouch)) == True;
        Or(And(Is Button Held(Event Player, Button(Primary Fire)), Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1))), And(Is Button Held(Event Player, Button(Secondary Fire)), Compare((Event Player).A, !=, 0))) == True;
    }
    actions {
        If(Is Button Held(Event Player, Button(Secondary Fire)));
            Abort If(Compare((Event Player).A, ==, 0));
            Teleport(Event Player, Value In Array(Global.A, Subtract((Event Player).A, 1)));
            Modify Player Variable(Event Player, A, Subtract, 1);
            If(Compare((Event Player).PracticeToggle, ==, 1));
                Modify Player Variable(Event Player, PracticeCheckpoint, Subtract, 1);
            End;
        Else;
            Abort If(Compare((Event Player).A, ==, Subtract(Count Of(Global.A), 1)));
            Modify Player Variable(Event Player, A, Add, 1);
            If(Compare((Event Player).PracticeToggle, ==, 1));
                Modify Player Variable(Event Player, PracticeCheckpoint, Add, 1);
            End;
            Teleport(Event Player, Value In Array(Global.A, (Event Player).A));
        End;
        Set Player Variable(Event Player, MovedCheckpoint, True);
        Call Subroutine(UpdateCache);
    }
}

disabled rule ("------------------------------------------------------------------------ Checks ------------------------------------------------------------------------ ") {
    event {
        Ongoing - Global;
    }
}

rule ("prevent ult swing") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Using Ultimate(Event Player) == True;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        (Event Player).C == 0;
    }
    actions {
        "prevents slashign in last second of ult, because it extends the duration"
        Wait(1.2, Ignore Condition);
        Disallow Button(Event Player, Button(Primary Fire));
        Wait Until(Not(Is Using Ultimate(Event Player)), 2);
        Wait(0.016, Ignore Condition);
        Allow Button(Event Player, Button(Primary Fire));
    }
}

rule ("Checking | Jump") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        Is Button Held(Event Player, Button(Jump)) == True;
        (Event Player).TY != 2;
    }
    actions {
        "and if it is turned off, it will still be banned for three stages after customs clearance.\r\n@Condition eventPlayer.A < len(A) - 1"
        Modify Player Variable(Event Player, TY, Add, 1);
    }
}

rule ("Checking | Bhop in the air") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).TY == 0;
        Is In Air(Event Player) == True;
        Is Button Held(Event Player, Button(Jump)) == False;
    }
    actions {
        Set Player Variable(Event Player, O, 0);
    }
}

rule ("Checking | In the air") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        (Event Player).TY == 0;
        Is In Air(Event Player) == True;
    }
    actions {
        "and if it is turned off, it will still be banned for three stages after customs clearance.\r\n@Condition eventPlayer.A < len(A) - 1"
        Set Player Variable(Event Player, TY, 1);
    }
}

rule ("Checking | Triple jump") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).TY == 1;
    }
    actions {
        Wait(0.1, Abort When False);
        Set Player Variable(Event Player, TY, 2);
    }
}

rule ("Checking | Player on the wall") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        "This rule is also linked to the determination of wall climbing, please do not close/delete"
        Is On Wall(Event Player) == True;
        Is Button Held(Event Player, Button(Jump)) == True;
    }
    actions {
        Set Player Variable(Event Player, TY, 2);
        Set Player Variable(Event Player, J, 1);
    }
}

rule ("Checking | Using Emote") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Communicating Any Emote(Event Player) == True;
    }
    actions {
        Set Player Variable(Event Player, O, 0);
    }
}

rule ("Checking | Bhop") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).O == 0;
        Is Jumping(Event Player) == True;
    }
    actions {
        Set Player Variable(Event Player, O, 1);
        Small Message(Event Player, Custom String("   Bhop", Null, Null, Null));
    }
}

rule ("Checking | Create Bhop") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is On Wall(Event Player) == False;
        Is Button Held(Event Player, Button(Crouch)) == True;
        Is Button Held(Event Player, Button(Jump)) == False;
        Is On Ground(Event Player) == False;
        Is In Air(Event Player) == True;
        Is Jumping(Event Player) == False;
        Is Crouching(Event Player) == True;
    }
    actions {
        Set Player Variable(Event Player, O, 0);
        If(And(And(Compare(Global.kaxiaotiao, ==, True), Compare((Event Player).C, ==, 0)), Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1))));
            Small Message(Event Player, Custom String("   Create Bhop is banned!", Null, Null, Null));
            Call Subroutine(checkpointFailReset);
            Abort;
        End;
        Small Message(Event Player, Custom String("   Bhop has been created!", Null, Null, Null));
    }
}

rule ("Checking | Bhop/Double Jump Initialization") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        Is On Ground(Event Player) == True;
    }
    actions {
        "Notes must be read! When this condition is turned on, the effect is \"Automatically open three stages after customs clearance\", \r\n and if it is turned off, three stages will still be banned after customs clearance.\r\n@Condition eventPlayer.A < len(A) - 1"
        Set Player Variable(Event Player, TY, 0);
        Set Player Variable(Event Player, J, 2);
        Wait(0, Ignore Condition);
        Loop If(And(Or(Compare((Event Player).TY, !=, 0), Compare((Event Player).J, !=, 2)), Is On Ground(Event Player)));
        Set Player Variable(Event Player, O, 1);
    }
}

rule ("Checking | Double jump, initialized with small jump") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        Is On Ground(Event Player) == True;
    }
    actions {
        "and if it is turned off, it will still be banned for three stages after customs clearance.\r\n@Condition eventPlayer.A < len(A) - 1"
        Set Player Variable(Event Player, TY, 0);
        Set Player Variable(Event Player, J, 2);
        Set Player Variable(Event Player, climbNum, 0);
        Wait(0, Ignore Condition);
        Loop If(And(Or(Compare((Event Player).TY, !=, 0), Compare((Event Player).J, !=, 2)), Is On Ground(Event Player)));
        Set Player Variable(Event Player, O, 1);
    }
}

rule ("HUD | Multiclimbs Used") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).J == 2;
        Has Spawned(Event Player) == True;
    }
    actions {
        Destroy HUD Text((Event Player).paqiang);
        Create HUD Text(Event Player, Custom String("Climb{0}", If-Then-Else(Compare((Event Player).climbNum, >, 0), Custom String("({0})", (Event Player).climbNum, Null, Null), Custom String("", Null, Null, Null)), Null, Null), Null, Null, Left, 2, Color(Green), Null, Null, Visible To and String, Default Visibility);
        Set Player Variable(Event Player, paqiang, Last Text ID);
    }
}

rule ("HUD | Wallclimb Used") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).J == 1;
        Has Spawned(Event Player) == True;
    }
    actions {
        Destroy HUD Text((Event Player).paqiang);
        Create HUD Text(Event Player, Custom String("Climb", Null, Null, Null), Null, Null, Left, 2, Color(Red), Null, Null, Visible To and String, Default Visibility);
        Set Player Variable(Event Player, paqiang, Last Text ID);
    }
}

rule ("HUD | Multiclimb Counter") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is On Wall(Event Player) == True;
        Is Button Held(Event Player, Button(Jump)) == False;
        (Event Player).J == 2;
    }
    actions {
        "@Condition eventPlayer.InvincibleToggle == 0"
        Modify Player Variable(Event Player, climbNum, Add, 1);
    }
}

rule ("HUD | Bhop") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Has Spawned(Event Player) == True;
    }
    actions {
        Wait(1, Ignore Condition);
        Create HUD Text(Event Player, Custom String("Bhop", Null, Null, Null), Null, Null, Left, 1, If-Then-Else(Compare((Event Player).O, ==, 0), Color(Green), (Event Player).CH), Null, Null, Color, Default Visibility);
    }
}

rule ("HUD | Bhop Indicator | Unused | Green") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is On Ground(Event Player) == True;
        Is Button Held(Event Player, Button(Jump)) == False;
    }
    actions {
        Set Player Variable(Event Player, CH, Color(Green));
    }
}

rule ("HUD | Bhop Indicator | Used | Red") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Jumping(Event Player) == True;
    }
    actions {
        Set Player Variable(Event Player, CH, Color(Red));
    }
}

disabled rule ("-------------------------------------------------------------------------- Bans --------------------------------------------------------------------------") {
    event {
        Ongoing - Global;
    }
}

rule ("Ban | Wallclimb for specific CPs <---- EDIT ME") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Wallclimb for specific CPs", Null, Null, Null), ${ban_wallclimbEnabled}, 2) == True;
        (Event Player).C == 0;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        "Change \"-1\" to certain Checkpoints' number"
        ${ban_wallclimbCp}
        "If all checkpoints need this function, enable this rule and disable Rule: \"Array Contains\" \r\n@Condition eventPlayer.A < len(A) - 1"
        Distance Between(Event Player, Value In Array(Global.A, Add((Event Player).A, 1))) <= 2;
    }
    actions {
        If(Compare((Event Player).J, ==, 1));
            Call Subroutine(checkpointFailReset);
            Small Message(Event Player, Custom String("   Climb is banned!", Null, Null, Null));
    }
}

rule ("Ban | Bhop for specific CPs      <---- EDIT ME") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Bhop for specific CPs", Null, Null, Null),  ${ban_bhopEnabled}, 3) == True;
        (Event Player).C == 0;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        "Change \"-1\" to certain Checkpoints' number"
        ${ban_bhopsCp}
        "If all checkpoints need this function, enable this rule and disable Rule: \"Array Contains\" \r\n@Condition eventPlayer.A < len(A) - 1"
        Distance Between(Event Player, Value In Array(Global.A, Add((Event Player).A, 1))) <= 2;
    }
    actions {
        If(Compare((Event Player).O, ==, 1));
            Call Subroutine(checkpointFailReset);
            Small Message(Event Player, Custom String("   Bhop is banned!", Null, Null, Null));
    }
}

rule ("Ban | Triple Jump") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Triple Jump", Null, Null, Null), ${ban_triple}, 0) == True;
        (Event Player).C == 0;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        Vertical Speed Of(Event Player) >= 5.8;
        (Event Player).TY == 1;
        Is Using Ability 1(Event Player) == False;
    }
    actions {
        Abort If(Is On Wall(Event Player));
        Small Message(Event Player, Custom String("   Triple Jump is banned!", Null, Null, Null));
        Call Subroutine(checkpointFailReset);
    }
}

rule ("Ban | Multiclimb") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Multiclimb", Null, Null, Null),  ${ban_multi}, 1) == True;
        (Event Player).C == 0;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        (Event Player).climbNum > 0;
    }
    actions {
        "@Condition eventPlayer.isHoldingButton(Button.JUMP) == false\r\n @Condition eventPlayer.WallclimbUsed == 2\r\n eventPlayer.applyImpulse(Vector.DOWN, eventPlayer.getSpeed(), Relativity.TO_PLAYER, Impulse.CANCEL_CONTRARY_MOTION)"
        Small Message(Event Player, Custom String("   Multiclimb is banned!", Null, Null, Null));
        Call Subroutine(checkpointFailReset);
    }
}

rule ("Ban | Emote Savehop") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Emote Savehop", Null, Null, Null), ${ban_emote}, 3) == True;
        (Event Player).C == 0;
        (Event Player).A < Subtract(Count Of(Global.A), 1);
        Is Communicating Any Emote(Event Player) == True;
    }
    actions {
        Small Message(Event Player, Custom String("   Emote Savehop is banned!", Null, Null, Null));
        Call Subroutine(checkpointFailReset);
    }
}

rule ("Ban | Create Bhop") {
    event {
        Ongoing - Global;
    }
    actions {
        Wait(1, Ignore Condition);
        Set Global Variable(kaxiaotiao, Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Create Bhop", Null, Null, Null),  ${ban_create}, 2));
    }
}

rule ("Ban | Deathbhop") {
    event {
        Ongoing - Global;
    }
    actions {
        Wait(1, Ignore Condition);
        Set Global Variable(deathjump, Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Deathbhop", Null, Null, Null), ${ban_dbhop}, 4));
    }
}

rule ("Ban | Dash Start") {
    event {
        Ongoing - Global;
    }
    actions {
        Wait(1, Ignore Condition);
        Set Global Variable(DashExploitToggle, Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Dash Start", Null, Null, Null),  ${ban_dashstart}, 4));
    }
}

disabled rule ("------------------------------------------------------------------------ Addons  ------------------------------------------------------------------------") {
    event {
        Ongoing - Global;
    }
}

${ulteanbled}rule ("Add Blade to Checkpoint <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        "Change \"-1\" to certain Checkpoints' number. For example if you want to add Blade to Checkpoint 2 and 6 change one of \"-1\" to 2 and other \"-1\" to 6"
        Wait(1, Ignore Condition);
        ${ultarray}
    }
}

${dasheanbled}rule ("Add Dash to Checkpoint <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        "Change \"-1\" to certain Checkpoints' number. For example if you want to add Dash to Checkpoint 7 and 1 change one of \"-1\" to 7 and other \"-1\" to 1"
        Wait(1, Ignore Condition);
        ${dasharray} 
    }
}

${titleon}rule ("Title Data <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        "checkpoint number"
        ${titlecps}
        "title"
        ${titlenames}
        "color"
        ${titlecolors}
    }
}

disabled rule ("In world text for certain Checkpoints <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        "warning: adding text might go over the text limit and caues huds to not apear"
        Create In-World Text(Filtered Array(All Players(All Teams), Compare((Current Array Element).A, ==, 0)), Custom String("Text for checkpoint 0", Null, Null, Null), Vector(0, 0, 0), 1.2, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
        Create In-World Text(Filtered Array(All Players(All Teams), Compare((Current Array Element).A, ==, 1)), Custom String("Text for checkpoint 1", Null, Null, Null), Vector(0, 0, 0), 1.2, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
        Create In-World Text(Filtered Array(All Players(All Teams), Compare((Current Array Element).A, ==, 2)), Custom String("Text for checkpoint 2", Null, Null, Null), Vector(0, 0, 0), 3, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
    }
}

disabled rule ("HUD text for certain Checkpoints <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        "first one is padding, leave it"
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("                                                   \r\n  \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n", Null, Null, Null), Top, -6, Null, Null, Color(Orange), Visible To, Default Visibility);
        "warning: adding text might go over the text limit and caues huds to not apear"
        Create HUD Text(Filtered Array(All Players(All Teams), Compare((Current Array Element).A, ==, 0)), Custom String("Text for checkpoint 0", Null, Null, Null), Null, Null, Top, -4, Color(Red), Null, Null, Visible To and String, Default Visibility);
        Create HUD Text(Filtered Array(All Players(All Teams), Compare((Current Array Element).A, ==, 1)), Custom String("Text for checkpoint 1", Null, Null, Null), Null, Null, Top, -4, Color(Red), Null, Null, Visible To and String, Default Visibility);
        Create HUD Text(Filtered Array(All Players(All Teams), Compare((Current Array Element).A, ==, 2)), Custom String("Text for checkpoint 2", Null, Null, Null), Null, Null, Top, -4, Color(Red), Null, Null, Visible To and String, Default Visibility);
    }
}

rule ("pre-set control map portal - placement - toggled via workshop") {
    event {
        Ongoing - Global;
    }
    conditions {
        Global.PortalOn != False;
    }
    actions {
        "overwrite pasta"
        Wait(2, Abort When False);
        If(Compare(Current Map, ==, Map(Busan)));
            "\"down > sanc\",\"down > meka\",\"sanc > down\",\"sanc > meka\",\"meka > sanc\",\"meka > down\""
            Set Global Variable(PortalNames, Array(Custom String("Sanctuary", Null, Null, Null), Custom String("MEKA base", Null, Null, Null), Custom String("Downtown", Null, Null, Null), Custom String("MEKA base", Null, Null, Null), Custom String("Sanctuary", Null, Null, Null), Custom String("Downtown", Null, Null, Null)));
            Set Global Variable(PortalLoc, Array(Vector(47.946, 7.248, -93.922), Vector(55.921, 6.998, -94.024), Vector(-326.382, 10.81, 117.261), Vector(-330.96, 10.81, 117.416), Vector(219.567, 10.215, 243.653), Vector(225.976, 10.227, 240.799)));
            Set Global Variable(PortalDest, Array(Vector(-328.552, 10.01, 120.82), Vector(221.152, 9.376, 238.765), Vector(52.197, 6.301, -97.513), Vector(221.271, 9.431, 238.978), Vector(-328.601, 10.01, 120.823), Vector(52.197, 6.299, -97.513)));
        Else If(Compare(Current Map, ==, Map(Ilios)));
            "\"light > ruin\",\"light > well\",\"ruin > light\",\"ruin > well\",\"well > light\",\"well > ruin\""
            Set Global Variable(PortalNames, Array(Custom String("Ruins", Null, Null, Null), Custom String("Well", Null, Null, Null), Custom String("Lighthouse", Null, Null, Null), Custom String("Well", Null, Null, Null), Custom String("Lighthouse", Null, Null, Null), Custom String("Ruins", Null, Null, Null)));
            Set Global Variable(PortalLoc, Array(Vector(325.722, -22.665, -40.401), Vector(327.43, -22.665, -36.089), Vector(26.176, 58.367, -156.415), Vector(30.472, 58.367, -156.307), Vector(-199.945, 2.015, -2.918), Vector(-194.93, 2.015, -8.054)));
            Set Global Variable(PortalDest, Array(Vector(28.375, 57.659, -161.195), Vector(-200.464, 1.306, -8.604), Vector(333.088, -23.389, -40.933), Vector(-200.464, 1.306, -8.604), Vector(333.088, -23.389, -40.933), Vector(28.375, 57.829, -161.195)));
        Else If(Or(Compare(Current Map, ==, Map(Lijiang Tower)), Compare(Current Map, ==, Map(Lijiang Tower Lunar New Year))));
            "\"control > garden\",\"control > market\",\"garden > control\",\"garden > market\",\"market > control\",\"market > garden\""
            Set Global Variable(PortalNames, Array(Custom String("Garden", Null, Null, Null), Custom String("Night Market", Null, Null, Null), Custom String("Control Center", Null, Null, Null), Custom String("Night Market", Null, Null, Null), Custom String("Control Center", Null, Null, Null), Custom String("Garden", Null, Null, Null)));
            Set Global Variable(PortalLoc, Array(Vector(-2.815, 271, 295.373), Vector(2.905, 271, 295.052), Vector(5.788, 95.056, 135.298), Vector(-5.343, 95.05, 134.638), Vector(-2.738, 0, -61.911), Vector(5.043, 0, -61.879)));
            Set Global Variable(PortalDest, Array(Vector(0.286, 94.292, 140.396), Vector(0.584, -0.709, -54.469), Vector(0.245, 270.292, 301.428), Vector(0.773, -0.708, -54.361), Vector(0.245, 270.292, 301.428), Vector(0.286, 94.292, 140.396)));
        Else If(Compare(Current Map, ==, Map(Nepal)));
            "\"vil > shrine\",\"vil > sanc\", \"shrine > vil\",\"shrine > sanc\",#\"sanc > vil\",\"sanc > shrine\""
            Set Global Variable(PortalNames, Array(Custom String("Shrine", Null, Null, Null), Custom String("Sanctum", Null, Null, Null), Custom String("Village", Null, Null, Null), Custom String("Sanctum", Null, Null, Null), Custom String("Village", Null, Null, Null), Custom String("Shrine", Null, Null, Null)));
            Set Global Variable(PortalLoc, Array(Vector(-194.732, -92.86, -3.802), Vector(-194.585, -92.86, 4.187), Vector(-33.165, 14, 5.212), Vector(-33.058, 14, -5.55), Vector(84.75, 129.008, -3.624), Vector(84.534, 129, 4.032)));
            Set Global Variable(PortalDest, Array(Vector(-40.19, 13.292, -0.105), Vector(78.43, 128.292, 0.149), Vector(-190.54, -93.569, 0.122), Vector(78.43, 128.292, 0.149), Vector(-190.54, -93.569, 0.122), Vector(-40.19, 13.292, -0.105)));
        Else If(Compare(Current Map, ==, Map(Oasis)));
            "\"uni > garden\",\"uni > city\",\"garden > uni\",\"garden > city\",\"city > garden\",\"city > uni\""
            Set Global Variable(PortalNames, Array(Custom String("Gardens", Null, Null, Null), Custom String("City Center", Null, Null, Null), Custom String("University", Null, Null, Null), Custom String("City Center", Null, Null, Null), Custom String("Gardens", Null, Null, Null), Custom String("University", Null, Null, Null)));
            Set Global Variable(PortalLoc, Array(Vector(-211.137, 20, -5.084), Vector(-211.346, 20, 5.029), Vector(143.061, 8.377, -245.04), Vector(139.333, 8.377, -249.964), Vector(157.297, 12.522, 255.759), Vector(151.452, 12.522, 261.099)));
            Set Global Variable(PortalDest, Array(Vector(134.366, 7.829, -240.53), Vector(158.27, 11.814, 262.272), Vector(-206.269, 19.292, 0.103), Vector(158.283, 11.814, 262.283), Vector(134.318, 7.829, -240.667), Vector(-206.269, 19.292, 0.103)));
        Else;
            Set Global Variable(PortalDest, Null);
            Abort;
    }
}

rule ("pre-set control map portal - function - toggled via workshop") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Global.PortalOn != False;
        Count Of(Global.PortalLoc) != Null;
        Or((Event Player).C, Compare((Event Player).A, ==, Subtract(Count Of(Global.A), 1))) == True;
        Is True For Any(Global.PortalLoc, Compare(Distance Between(Add(Position Of(Event Player), Vector(0, 0.2, 0)), Current Array Element), <, 1.4)) == True;
    }
    actions {
        If(Compare(Value In Array(Global.PortalDest, Index Of Array Value(Global.PortalLoc, First Of(Sorted Array(Global.PortalLoc, Distance Between(Event Player, Current Array Element))))), !=, Vector(0, 0, 0)));
            Teleport(Event Player, Value In Array(Global.PortalDest, Index Of Array Value(Global.PortalLoc, First Of(Sorted Array(Global.PortalLoc, Distance Between(Event Player, Current Array Element))))));
    }
}

disabled rule ("custom portals - data <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        Wait(1, Ignore Condition);
        "Portal start position"
        Set Global Variable(CustomPortalStart, Array(Vector(0, 0, 0)));
        "Portal end position (on same number as start position)"
        Set Global Variable(CustomPortalEndpoint, Array(Vector(0, 10, 0)));
        "Portal checkpoint (on same number as start position) \r\n999 = apply portal to entire map"
        Set Global Variable(CustomPortalCP, Array(999));
    }
}

disabled rule ("custom portals - function") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Count Of(Global.CustomPortalStart) > 0;
        Is True For Any(Global.CustomPortalStart, And(Compare(Distance Between(Add(Position Of(Event Player), Vector(0, 0.2, 0)), Current Array Element), <, 1.3), Array Contains(Array(999, (Event Player).A), Value In Array(Global.CustomPortalCP, Current Array Index)))) == True;
    }
    actions {
        Set Player Variable(Event Player, PortalLoop, 0);
        For Player Variable(Event Player, PortalLoop, 0, Count Of(Global.CustomPortalStart), 1);
            If(And(Compare(Distance Between(Add(Position Of(Event Player), Vector(0, 0.2, 0)), Value In Array(Global.CustomPortalStart, (Event Player).PortalLoop)), <, 1.3), Array Contains(Array(999, (Event Player).A), Value In Array(Global.CustomPortalCP, (Event Player).PortalLoop))));
                Teleport(Event Player, Value In Array(Global.CustomPortalEndpoint, (Event Player).PortalLoop));
                Abort;
            End;
        End;
        Wait(1, Ignore Condition);
    }
}

`
}