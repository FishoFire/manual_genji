function setdata(){ //String.raw
    data_pasta = String.raw`
settings
{
	main
	{
		Description: "  ~ The Official Genji Parkour Editor ~\nCode: 54CRY\nAdapted by: nebula#11571/FishoFire#2431"
		Mode Name: "Genji Parkour v1.7 BETA"
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
			enabled maps
			{
			}
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
			Respawn Time Scalar: 0%
			Spawn Health Packs: Disabled
			Respawn As Random Hero: On
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
		Spawn More Dummy Bots
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
        58: HudStoreEdit
        60: SaveName
        61: SaveCp
        62: SaveEnt
        63: SaveTimer
        64: SaveElapsed
        65: SavePauseTime
        66: SavePauseEnabled
        74: CpHudText
        75: CpHudCp
        76: CpIwtText
        77: CpIwtCp
        78: CpIwtPos
        79: CpIwtColor
        80: BanTriple
        81: BanMulti
        82: BanCreate
        83: BanDead
        84: BanEmote
        85: BanClimb
        86: BanBhop
    player:
        0: A
        2: C
        3: D
        4: E
        5: F
        6: ArrayIterator
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
        20: NotOnLastCp
        26: TY
        28: paqiang
        31: quick_restart
        32: climbNum
        33: finishfxcache
        38: PreviewsArray
        39: PreviewsI
        40: invis
        41: flytoggle
        42: savemaphud
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
        70: banstring
        71: ban_triple
        72: ban_multi
        73: ban_create
        74: ban_dedhop
        75: ban_dashstart
        76: ban_emote
        77: ban_climb
        79: splittime
        80: splitdisplay
        81: splitson
        82: practicetimer
        85: CH
}
subroutines {
    0: Leaderboardupdate
    1: Sub1
    2: CreateLeaderBoard
    3: KILLBALL
    4: pinball
    5: BuildPortals
    6: UpdateTitle
    7: DashUltGive
    8: CheckUlt
    9: CheckDash
    10: DeleteSave
    11: MakeSave
    12: StartPauseTimer
    13: StopPauseTimer
    14: RebuildBounceOrbs
    15: RebuildKillOrbs
    16: UpdateCache
    17: checkpointFailReset
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
		
	}
}
rule ("Credits here <---- INSERT YOUR NAME HERE") {
    event {
        Ongoing - Global;
    }
    actions {
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("made by: ${mapmaker}", Null, Null, Null), Left, -200, Null, Null, Color(Violet), Visible To, Default Visibility);
        "appending these makes em removed in editor"
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("map code: ${mapcode}", Null, Null, Null), Left, -199, Null, Null, Color(Sky Blue), Visible To, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("Discord: dsc.gg/genjiparkour", Null, Null, Null), Left, -198, Null, Null, Color(Aqua), Visible To, Default Visibility);
    }
}

rule ("Ban per CP <---- edit me") {
    event {
        Ongoing - Global;
    }
    actions {
        "Enter the checkpoint/level numbers in the lists below to apply the ban on them\r\n Remember the workshop toggle overwrites this list"
        Wait(1, Ignore Condition);
        "======================\r\n ban  triple >"
        ${cpbantriple}
        "ban  multi >"
        ${cpbanmulti}
        "ban create >"
        ${cpbancreate}
        "ban dedhop >"
        ${cpbandead}
        "ban emote >"
        ${cpbanemote}
        "ban  climb >"
        ${cpclimb}
        "======================\r\n dash exploit (via toggles don't edit)"
        Set Global Variable(DashExploitToggle, Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Create Bhop", Null, Null, Null), ${ban_dashstart}, 2));
    }
}

${customdifenabled}rule ("Custom difficulty hud") {
    event {
        Ongoing - Global;
    }
    actions {
        "1) workshop settings > difficulty > set to \"dont display\"\r\n2) enable this rule\r\n3) type your difficulty in the hud below"
        Create HUD Text(All Players(All Teams), Null, Custom String("${customdiftxt}", Null, Null, Null), Null, Top, -175, Null, Color(${customdifcolor}), Null, Visible To, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
    }
}

disabled rule ("Display World Record") {
    event {
        Ongoing - Global;
    }
    actions {
        "type your entry in the textfield that says \"name and time here\""
        Create HUD Text(All Players(All Teams), Null, Custom String(" \n{0} world record {0}", Icon String(Fire), Null, Null), Custom String("name and time here", Null, Null, Null), Right, -148, Color(Rose), Color(Rose), Color(Rose), Visible To, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
    }
}

disabled rule ("Friend Title <----  DISPLAY MESSAGE HERE (ON PLAYER)") {
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
        "Instructions that show when you start comp mode.\r\nDue to the hud text limit, you there is 4 huds available.\r\nIf you dont need a field just empty the textfield."
        Set Global Variable At Index(instructiontext, 0, Custom String("${compdescription[0]}", Null, Null, Null));
        Set Global Variable At Index(instructiontext, 1, Custom String("${compdescription[1]}", Null, Null, Null));
        Set Global Variable At Index(instructiontext, 2, Custom String("${compdescription[2]}", Null, Null, Null));
        Set Global Variable At Index(instructiontext, 3, Custom String("${compdescription[3]}", Null, Null, Null));
    }
}


disabled rule ("------------------------------------------------------------------------  General functions ------------------------------------------------------------------------ ") {
    event {
        Ongoing - Global;
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
        End;
        Modify Global Variable(TQ2, Append To Array, Last Created Entity);
        Wait(0.016, Ignore Condition);
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
                Create Effect(Filtered Array(All Players(All Teams), Or((Current Array Element).C, Not((Current Array Element).NotOnLastCp))), Bad Aura, If-Then-Else(Compare(Modulo(Evaluate Once(Global.NANBA), 2), ==, 1), Color(Aqua), Color(Orange)), Value In Array(Global.PortalLoc, Evaluate Once(Global.NANBA)), 0.6, Visible To);
                Create In-World Text(Filtered Array(All Players(All Teams), Or((Current Array Element).C, Not((Current Array Element).NotOnLastCp))), Custom String("{0}", Value In Array(Global.PortalNames, Evaluate Once(Global.NANBA)), Null, Null), Add(Value In Array(Global.PortalLoc, Evaluate Once(Global.NANBA)), Vector(0, 1, 0)), 1, Clip Against Surfaces, Visible To, Color(White), Default Visibility);
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
        Set Player Variable(Event Player, NotOnLastCp, And(Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1)), Compare(Count Of(Global.A), >, 1)));
        Set Player Variable(Event Player, BouncePosition_Cache, Filtered Array(Global.TQ, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceStrength_Cache, Filtered Array(Global.EditMode, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceUlt_Cache, Filtered Array(Global.TQ5, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceDash_Cache, Filtered Array(Global.TQ6, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceLock_Cache, Filtered Array(Global.BounceToggleLock, Compare(Value In Array(Global.pinballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, KillPosition_Cache, Filtered Array(Global.H, Compare(Value In Array(Global.killballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, KillRadii_Cache, Filtered Array(Global.I, Compare(Value In Array(Global.killballnumber, Current Array Index), ==, (Event Player).A)));
        Set Player Variable(Event Player, BounceLockMax_Cache, Count Of(Filtered Array((Event Player).BounceLock_Cache, Current Array Element)));
        Set Player Variable(Event Player, banstring, Custom String("", Null, Null, Null));
        Wait(0.016, Ignore Condition);
        If(Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Triple Jump on all cps", Null, Null, Null), ${ban_triple}, 0));
            Set Player Variable(Event Player, ban_triple, True);
        Else If(Array Contains(Global.BanTriple, (Event Player).A));
            Set Player Variable(Event Player, banstring, Custom String("▲ {0}", (Event Player).banstring, Null, Null));
            Set Player Variable(Event Player, ban_triple, True);
        Else;
            Set Player Variable(Event Player, ban_triple, False);
        End;
        If(Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Multiclimb on all cps", Null, Null, Null), ${ban_multi}, 1));
            Set Player Variable(Event Player, ban_multi, True);
        Else If(Array Contains(Global.BanMulti, (Event Player).A));
            Set Player Variable(Event Player, banstring, Custom String("∞ {0}", (Event Player).banstring, Null, Null));
            Set Player Variable(Event Player, ban_multi, True);
        Else;
            Set Player Variable(Event Player, ban_multi, False);
        End;
        If(Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Createbhop on all cps", Null, Null, Null), ${ban_create}, 2));
            Set Player Variable(Event Player, ban_create, True);
        Else If(Array Contains(Global.BanCreate, (Event Player).A));
            Set Player Variable(Event Player, banstring, Custom String("♂ {0}", (Event Player).banstring, Null, Null));
            Set Player Variable(Event Player, ban_create, True);
        Else;
            Set Player Variable(Event Player, ban_create, False);
        End;
        If(Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Deathbhop on all cps", Null, Null, Null), ${ban_dbhop}, 3));
            Set Player Variable(Event Player, ban_dedhop, True);
        Else If(Array Contains(Global.BanDead, (Event Player).A));
            Set Player Variable(Event Player, banstring, Custom String("X {0}", (Event Player).banstring, Null, Null));
            Set Player Variable(Event Player, ban_dedhop, True);
        Else;
            Set Player Variable(Event Player, ban_dedhop, False);
        End;
        If(Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Emote Savehop on all cps", Null, Null, Null), ${ban_emote}, 4));
            Set Player Variable(Event Player, ban_emote, True);
        Else If(Array Contains(Global.BanEmote, (Event Player).A));
            Set Player Variable(Event Player, banstring, Custom String("♥ {0}", (Event Player).banstring, Null, Null));
            Set Player Variable(Event Player, ban_emote, True);
        Else;
            Set Player Variable(Event Player, ban_emote, False);
        End;
        If(Workshop Setting Toggle(Custom String("Ban Switch", Null, Null, Null), Custom String("Ban Wallclimb on all cps", Null, Null, Null), ${ban_climb}, 5));
            Set Player Variable(Event Player, ban_climb, True);
        Else If(Array Contains(Global.BanClimb, (Event Player).A));
            Set Player Variable(Event Player, banstring, Custom String("↑ {0}", (Event Player).banstring, Null, Null));
            Set Player Variable(Event Player, ban_climb, True);
        Else;
            Set Player Variable(Event Player, ban_climb, False);
        End;
        Wait(0.016, Ignore Condition);
        Start Rule(CheckUlt, Restart Rule);
        Start Rule(CheckDash, Restart Rule);
        Abort If(Not((Event Player).EditorOn));
        Destroy Effect((Event Player).EffectSizeArray);
        Set Player Variable(Event Player, EffectSizeArray, Empty Array);
        Create Effect(If-Then-Else((Event Player).EffectSizeToggle, Event Player, Null), Sphere, Color(White), Value In Array(Global.A, (Event Player).A), 1.4, Visible To Position and Radius);
        Modify Player Variable(Event Player, EffectSizeArray, Append To Array, Last Created Entity);
        Create Effect(If-Then-Else(And((Event Player).EffectSizeToggle, (Event Player).NotOnLastCp), Event Player, Null), Sphere, Color(White), Value In Array(Global.A, Add((Event Player).A, 1)), 1.4, Visible To Position and Radius);
        Modify Player Variable(Event Player, EffectSizeArray, Append To Array, Last Created Entity);
        Set Player Variable(Event Player, BounceIndex_Cache, Filtered Array(Mapped Array(Global.pinballnumber, If-Then-Else(Compare(Current Array Element, ==, (Event Player).A), Current Array Index, -1)), Compare(Current Array Element, >=, 0)));
        Set Player Variable(Event Player, KillIndex_Cache, Filtered Array(Mapped Array(Global.killballnumber, If-Then-Else(Compare(Current Array Element, ==, (Event Player).A), Current Array Index, -1)), Compare(Current Array Element, >=, 0)));
        If(And((Event Player).MovedCheckpoint, Compare(Event Player, ==, Host Player)));
            "SelectedCheckpoint_Editing = eventPlayer.CurrentCheckpoint"
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

rule ("Editor | Clear Excess Data to Save Map") {
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
        Set Player Variable(Host Player, A, 0);
        Set Global Variable(C, 0);
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
        Set Global Variable(SaveName, Empty Array);
        Set Global Variable(SaveCp, Empty Array);
        Set Global Variable(SaveTimer, Empty Array);
        Set Global Variable(SaveEnt, Empty Array);
        Set Global Variable(SavePauseTime, Empty Array);
        Set Global Variable(SavePauseEnabled, Empty Array);
        Set Global Variable(SaveElapsed, Empty Array);
        Set Global Variable(LeaderBoardFull, Empty Array);
        Set Global Variable(PortalOn, False);
        Enable Inspector Recording;
        Create HUD Text(Event Player, Custom String(" ", Null, Null, Null), Null, Custom String("　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   0. clear excess data:\n Automatically done when opening this window\n\n   1. Copy da{0}", Custom String("ta:\n Open Workshop Inspector → Set variable target as global\n click the [x]\n\n   2. Insert data:\n Paste the data in the rul{0}", Custom String("e named 'map data pasta' (first rule)\n\n   3. Workshop settings:\n ESC→SHOW LOBBY→SETTINGS→ workshop settings →\n toggle 'Edi{0}", Custom String("tor mode' off\n Select display difficulty\n", Null, Null, Null), Null, Null), Null, Null), Null, Null), Top, -187, Color(Lime Green), Color(Lime Green), Color(Lime Green), Visible To, Default Visibility);
        Set Player Variable At Index(Event Player, savemaphud, 0, Last Text ID);
        Create HUD Text(Event Player, Custom String(" ", Null, Null, Null), Null, Custom String("　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   4. Create initial sharecode:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n CREATE NEW COD{0}", Custom String("E→COPY CODE\n\n   5. Add credits:\n Enter your name & map code in the 'Credits here' rule\n (second rule) \n\n   6. Update for c{0}", Custom String("redits:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n UPLOAD TO EXISTING CODE→ PASTE THE CODE YOU CREATED IN STEP 4\n", Null, Null, Null), Null, Null), Null, Null), Top, -186, Color(Lime Green), Color(Lime Green), Color(Lime Green), Visible To, Default Visibility);
        Set Player Variable At Index(Event Player, savemaphud, 1, Last Text ID);
        Create HUD Text(Event Player, Custom String("    > Press Interact to close this window <    ", Null, Null, Null), Null, Null, Top, -185, Color(Lime Green), Null, Null, None, Default Visibility);
        Set Player Variable At Index(Event Player, savemaphud, 2, Last Text ID);
        Wait Until(Not(Is Button Held(Event Player, Button(Interact))), 9999);
        Wait Until(Is Button Held(Event Player, Button(Interact)), 9999);
        Destroy HUD Text(First Of((Event Player).savemaphud));
        Destroy HUD Text(Value In Array((Event Player).savemaphud, 1));
        Destroy HUD Text(Value In Array((Event Player).savemaphud, 2));
    }
}

rule ("Editor | Hud and Effects") {
    event {
        Ongoing - Global;
    }
    actions {
        "@Condition hostPlayer.EditorOn\r\n condition messes up if host player leaves"
        Wait Until(Has Spawned(Host Player), 90);
        Wait(1, Ignore Condition);
        If(Not((Host Player).EditorOn));
            Set Global Variable(HudStoreEdit, Null);
            Abort;
        End;
        Wait(2, Ignore Condition);
        "remove unnesesary huds"
        While(Compare(Count Of(Global.HudStoreEdit), >, 0));
            Destroy HUD Text(First Of(Global.HudStoreEdit));
            Destroy In-World Text(First Of(Global.HudStoreEdit));
            Modify Global Variable(HudStoreEdit, Remove From Array By Index, 0);
        End;
        Wait(0.016, Ignore Condition);
        "infinite time and atemps"
        If(Global.CompMode);
            Set Global Variable(CompAtmpNum, 0);
            Set Global Variable(CompTime, 99999);
            Set Player Variable(All Players(All Teams), AttemptCount, Null);
            Set Player Variable(All Players(All Teams), CompDone, False);
        End;
        "huds =========================================================================================================================================================================="
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), Null, Null, Custom String("{0}", Value In Array(Array(Custom String("{0} + {1} | Create New Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Delete selected Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Add teleport to Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Reload)), Custom String("{0} + {1} | Set Checkpoint to current position\n{0} + {2} | Toggle Checkpoint Hitbox\n{1} (hold) | Precise position changing", Input Binding String(Button(Interact)), Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 1)))))), Custom String("{0} + {1} | Create new kill orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Select next orb\n\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Increase orb size\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb size\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Move orb forward\n{0} + {2} | Move orb Backward", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire))))))))), Custom String("{0} + {1} | Create new Bounce orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Select next orb\n\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Increase orb strength\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb strength\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Move orb forward\n{0} + {2} | Move orb back", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire)))))))))), (Host Player).E), Null, Null), Right, -150, Null, Null, Color(Yellow), Visible To and String, Default Visibility);
        Create HUD Text(Host Player, Null, Null, If-Then-Else((Host Player).K, Custom String(" \n{0} + {1} | Next checkpoint\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Prev checkpoint\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)), Custom String("{0} | Fly (checkpoint mode only)\nHold {1} | toggle guide\n", Input Binding String(Button(Ability 2)), Input Binding String(Button(Melee)), Null))), Custom String("Hold {0} | toggle guide", Input Binding String(Button(Melee)), Null, Null)), Right, -151, Null, Null, If-Then-Else((Host Player).K, Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), Null, Custom String("to save map hold {0} + {1} + {2} and follow instructions", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)), Input Binding String(Button(Reload))), Null, Left, -197, Null, Color(Yellow), Null, Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), If-Then-Else(Compare(Local Player, ==, Host Player), Custom String(" {0} {1} ", Value In Array(Array(Icon String(Flag), Icon String(Skull), Icon String(Moon)), (Host Player).E), Value In Array(Array(Custom String("Checkpoints mode", Null, Null, Null), Custom String("Kill Orb mode", Null, Null, Null), Custom String("Bounce Orb mode", Null, Null, Null)), (Host Player).E), Null), Custom String(" {0} Genji editor {0} \n host/editor: {1} ", Icon String(Bolt), Host Player, Null)), Null, Null, Top, -176, Color(Blue), Color(Blue), Color(Blue), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), Null, Custom String("Hold {0} to change mode", Input Binding String(Button(Ability 1)), Null, Null), Null, Top, -177, Color(Sky Blue), Color(Sky Blue), Color(Sky Blue), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else(And(And(Compare((Host Player).E, ==, 2), (Host Player).K), Compare(Count Of((Host Player).BounceIndex_Cache), >, 0)), Host Player, Null), Null, Null, Custom String("{0} + {1} | orb give ult {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Primary Fire)), Custom String("{0} | {1}", Ability Icon String(Hero(Genji), Button(Ultimate)), If-Then-Else(Compare(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)), Null)), Left, -191, Null, Null, If-Then-Else(Compare(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else(And(And(Compare((Host Player).E, ==, 2), (Host Player).K), Compare(Count Of((Host Player).BounceIndex_Cache), >, 0)), Host Player, Null), Null, Null, Custom String("{0} + {1} | orb give dash {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Secondary Fire)), Custom String("{0} | {1}", Ability Icon String(Hero(Genji), Button(Ability 1)), If-Then-Else(Compare(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)), Null)), Left, -190, Null, Null, If-Then-Else(Compare(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else(And(And(Compare((Host Player).E, ==, 2), (Host Player).K), Compare(Count Of((Host Player).BounceIndex_Cache), >, 0)), Host Player, Null), Null, Null, Custom String("{0} + {1} | unlocks checkpoint {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 2)), Custom String("{0} | {1}\n", Icon String(Asterisk), If-Then-Else(Compare(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)), Null)), Left, -189, Null, Null, If-Then-Else(Compare(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), Custom String(" orb/portal limit: {0}/{1} ", Add(Add(Count Of(Global.TQ), Count Of(Global.H)), Count Of(Global.CustomPortalStart)), 193, Null), Null, Null, Left, -193, Color(Blue), Color(Sky Blue), Color(Sky Blue), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), If-Then-Else(And(Compare((Host Player).E, ==, 0), Compare(Count Of(Global.A), >, 0)), Custom String("\n Selected Checkpoint \n Vector: {0}{1} \n", Value In Array(Global.A, (Host Player).A), If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), <, 2), Custom String("", Null, Null, Null), Custom String("\n Teleport: {0}", Value In Array(Value In Array(Global.A, (Host Player).A), 1), Null, Null)), Null), If-Then-Else(And(Compare((Host Player).E, ==, 1), Compare(Count Of((Host Player).KillIndex_Cache), >, 0)), Custom String("\n Selected Kill Orb \n Vector: {0} \n radius: {1} \n", Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)), Value In Array(Global.I, Value In Array((Host Player).KillIndex_Cache, Global.J)), Null), If-Then-Else(And(Compare((Host Player).E, ==, 2), Compare(Count Of((Host Player).BounceIndex_Cache), >, 0)), Custom String("\n Selected Bounce Orb \n Vector: {0} \n strength: {1} \n", Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Value In Array(Global.EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Null), Custom String("\n   No data selected   \n", Null, Null, Null)))), Null, Null, Left, -192, Color(White), Color(Orange), Color(Orange), Visible To and String, Default Visibility);
        Wait(2, Ignore Condition);
        "effects ==========================================================================================================================================================================\r\n Purple bounce selectino aura"
        Create Effect(If-Then-Else(And(Compare((Host Player).A, !=, -1), (Host Player).BouncePosition_Cache), All Players(All Teams), Null), Good Aura, Color(Purple), Global.TQ3, 1, Visible To Position and Radius);
        "Selected kill orb text"
        Create In-World Text(If-Then-Else(And(Compare((Host Player).A, !=, -1), (Host Player).KillPosition_Cache), All Players(All Teams), Null), Custom String("Selected Kill Orb", Null, Null, Null), Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)), 1.6, Do Not Clip, Visible To Position and String, Color(Sky Blue), Default Visibility);
        "Red distance orb for kill orb"
        Create Effect(If-Then-Else(And(Compare((Host Player).A, !=, -1), (Host Player).KillPosition_Cache), All Players(All Teams), Null), Orb, Color(Red), Global.L, 1, Visible To Position and Radius);
        "Distance # text for kill orb (removed the L from M string)"
        Create In-World Text(If-Then-Else(And(Compare((Host Player).A, !=, -1), (Host Player).KillPosition_Cache), All Players(All Teams), Null), Custom String("{0} m", Distance Between(Host Player, Global.L), Null, Null), Subtract(Global.L, Vector(0, 1.5, 0)), 1.5, Do Not Clip, Visible To Position and String, Color(Red), Default Visibility);
        "Selected kill orb arrow icon"
        Create Icon(If-Then-Else(And(Compare((Host Player).A, !=, -1), (Host Player).KillPosition_Cache), All Players(All Teams), Null), Add(Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)), Vector(0, 0.6, 0)), Arrow: Down, Visible To and Position, Color(Red), True);
        "Purple sphere for teleport location"
        Create Effect(If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), >, 1), All Players(All Teams), Null), Sphere, Color(Purple), Subtract(Value In Array(Value In Array(Global.A, (Host Player).A), 1), Vector(0, 0.1, 0)), 0.2, Visible To Position and Radius);
        "Teleport arrow icon"
        Create Icon(If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), >, 1), All Players(All Teams), Null), Add(Value In Array(Value In Array(Global.A, (Host Player).A), 1), Vector(0, 0.6, 0)), Arrow: Down, Visible To and Position, Color(Purple), True);
        "Teleport text"
        Create In-World Text(If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), >, 1), All Players(All Teams), Null), Custom String("TELEPORTER EXIT", Null, Null, Null), Value In Array(Value In Array(Global.A, (Host Player).A), 1), 1.6, Do Not Clip, Visible To Position and String, Color(Sky Blue), Default Visibility);
    }
}

rule ("Editor |  Fly/Noclip Toggle") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        (Event Player).E == 0;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        Is Button Held(Event Player, Button(Crouch)) == False;
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
        Set Player Variable(Event Player, flytoggle, Null);
        Stop Forcing Player Position(Event Player);
        Wait(1, Ignore Condition);
    }
}

rule ("Editor | Toggle Guide") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Event Player, Button(Melee)) == True;
        Event Player == Host Player;
        Is Button Held(Event Player, Button(Interact)) == False;
        Is Button Held(Event Player, Button(Reload)) == False;
    }
    actions {
        Wait(1, Abort When False);
        Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
        Small Message(Event Player, If-Then-Else((Event Player).K, Custom String("   Guide is open", Null, Null, Null), Custom String("   Guide is hidden", Null, Null, Null)));
        Set Player Variable(Event Player, K, Not((Event Player).K));
    }
}

rule ("Editor | change mode") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Event Player == Host Player;
        Is Button Held(Event Player, Button(Ability 1)) == True;
    }
    actions {
        Wait(0.84, Abort When False);
        Set Player Variable(Event Player, flytoggle, Null);
        Small Message(Host Player, Value In Array(Array(Custom String("   Current mode: Kill Orb", Null, Null, Null), Custom String("   Current mode: Bounce Orb", Null, Null, Null), Custom String("   Current mode: Checkpoint", Null, Null, Null)), (Event Player).E));
        Wait(0.016, Ignore Condition);
        Set Player Variable(Event Player, E, Modulo(Add((Event Player).E, 1), 3));
    }
}

rule ("Editor | create cp/orb") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).EditorOn != False;
        Event Player == Host Player;
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Primary Fire)) == True;
    }
    actions {
        If(Compare((Event Player).E, ==, 0));
            If(And(Compare(Count Of(Global.A), >, 1), Compare(Distance Between(Event Player, Value In Array(Global.A, (Host Player).A)), <=, 1.4)));
                Small Message(Event Player, Custom String("   Cannot place checkpoints too close.", Null, Null, Null));
                Abort;
            End;
            If(Compare((Event Player).A, >, Subtract(Count Of(Global.A), 1)));
                Set Player Variable(Event Player, A, Subtract(Count Of(Global.A), 1));
            End;
            If(Compare((Host Player).A, ==, Subtract(Count Of(Global.A), 1)));
                Modify Global Variable(A, Append To Array, Position Of(Event Player));
                Modify Player Variable(Event Player, A, Add, 1);
                Call Subroutine(UpdateCache);
            Else;
                Modify Global Variable(A, Append To Array, Position Of(Event Player));
                Set Global Variable(A, Mapped Array(Global.A, If-Then-Else(Compare(Current Array Index, <, Add((Host Player).A, 1)), Current Array Element, If-Then-Else(Compare(Current Array Index, ==, Add((Host Player).A, 1)), Last Of(Global.A), Value In Array(Global.A, Subtract(Current Array Index, 1))))));
                Modify Player Variable(Host Player, A, Add, 1);
                Set Global Variable(killballnumber, Mapped Array(Global.killballnumber, Add(Current Array Element, If-Then-Else(Compare(Current Array Element, >=, (Host Player).A), 1, 0))));
                Set Global Variable(pinballnumber, Mapped Array(Global.pinballnumber, Add(Current Array Element, If-Then-Else(Compare(Current Array Element, >=, (Host Player).A), 1, 0))));
                Call Subroutine(UpdateCache);
                Call Subroutine(RebuildKillOrbs);
                Call Subroutine(RebuildBounceOrbs);
            End;
            Small Message(All Players(All Teams), Custom String("   New Checkpoint has been created", Null, Null, Null));
        Else If(Compare((Event Player).E, ==, 1));
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
            Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null), Compare((Current Array Element).A, ==, Value In Array(Global.killballnumber, Evaluate Once(Value In Array((Host Player).KillIndex_Cache, Global.J))))), Sphere, Color(Blue), Value In Array(Global.H, Evaluate Once(Value In Array((Host Player).KillIndex_Cache, Global.J))), Value In Array(Global.I, Evaluate Once(Value In Array((Host Player).KillIndex_Cache, Global.J))), Visible To Position and Radius);
            Modify Global Variable(K, Append To Array, Last Created Entity);
            Call Subroutine(UpdateCache);
            Set Global Variable(J, Subtract(Count Of((Host Player).KillIndex_Cache), 1));
            Set Global Variable(L, Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)));
            Call Subroutine(RebuildKillOrbs);
            Big Message(All Players(All Teams), Custom String("New Kill Orb has been created! \r\nIt's only valid for checkpoint {0}", (Event Player).A, Null, Null));
        Else If(Compare((Event Player).E, ==, 2));
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

rule ("Editor | delete cp/orb") {
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
        If(Compare((Event Player).E, ==, 0));
            "Resync Kill Orbs"
            Set Player Variable(Event Player, Temp, Empty Array);
            Set Player Variable(Event Player, Temp, Filtered Array(Mapped Array(Global.killballnumber, If-Then-Else(Compare(Current Array Element, ==, (Host Player).A), Current Array Index, -1)), Compare(Current Array Element, >=, 0)));
            "eventPlayer.Temp = [i for e, i in KillballCheckpoints if e == hostPlayer.CurrentCheckpoint]"
            For Global Variable(NANBA, 0, Count Of((Event Player).Temp), 1);
                Destroy Effect(Value In Array(Global.K, Value In Array((Event Player).Temp, Global.NANBA)));
                Modify Global Variable(K, Remove From Array By Index, Value In Array((Event Player).Temp, Global.NANBA));
                Wait(0.016, Ignore Condition);
            End;
            "Remove specified checkpoint"
            Set Global Variable(killballnumber, Remove From Array(Global.killballnumber, (Host Player).A));
            "Decrement checkpoints after removed one"
            Set Global Variable(killballnumber, Mapped Array(Global.killballnumber, Subtract(Current Array Element, If-Then-Else(Compare(Current Array Element, >, (Host Player).A), 1, 0))));
            "Remove Radii at Checkpoint indexes (temp)"
            Set Global Variable(I, Filtered Array(Global.I, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(H, Filtered Array(Global.H, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(J, Subtract(Count Of((Host Player).KillIndex_Cache), 1));
            Set Global Variable(L, Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)));
            Set Player Variable(Event Player, Temp, Empty Array);
            "Resync Bounce Orbs"
            Set Player Variable(Event Player, Temp, Filtered Array(Mapped Array(Global.pinballnumber, If-Then-Else(Compare(Current Array Element, ==, (Host Player).A), Current Array Index, -1)), Compare(Current Array Element, >=, 0)));
            "eventPlayer.Temp = [i for e, i in BouncePadCheckpoints if e == hostPlayer.CurrentCheckpoint]"
            For Global Variable(NANBA, 0, Count Of((Event Player).Temp), 1);
                Destroy Effect(Value In Array(Global.TQ2, Value In Array((Event Player).Temp, Global.NANBA)));
                Modify Global Variable(TQ2, Remove From Array By Index, Value In Array((Event Player).Temp, Global.NANBA));
                Wait(0.016, Ignore Condition);
            End;
            "Remove specified checkpoint"
            Set Global Variable(pinballnumber, Remove From Array(Global.pinballnumber, (Host Player).A));
            "Decrement checkpoints after removed one"
            Set Global Variable(pinballnumber, Mapped Array(Global.pinballnumber, Subtract(Current Array Element, If-Then-Else(Compare(Current Array Element, >, (Host Player).A), 1, 0))));
            Set Global Variable(TQ, Filtered Array(Global.TQ, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(EditMode, Filtered Array(Global.EditMode, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(TQ5, Filtered Array(Global.TQ5, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(TQ6, Filtered Array(Global.TQ6, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(BounceToggleLock, Filtered Array(Global.BounceToggleLock, Not(Array Contains((Event Player).Temp, Current Array Index))));
            Set Global Variable(TQ1, Subtract(Count Of((Host Player).BounceIndex_Cache), 1));
            Set Global Variable(TQ3, Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)));
            Modify Global Variable(A, Remove From Array By Index, (Host Player).A);
            Modify Global Variable(C, Remove From Array By Index, (Host Player).A);
            If(Compare((Host Player).A, <=, 0));
                Set Player Variable(Host Player, A, -1);
                Skip(2);
            End;
            Modify Player Variable(Host Player, A, Subtract, 1);
            Call Subroutine(RebuildKillOrbs);
            Call Subroutine(RebuildBounceOrbs);
            Small Message(All Players(All Teams), Custom String("   Checkpoint has been deleted", Null, Null, Null));
        Else If(And(And(Compare((Event Player).E, ==, 1), Compare(Count Of((Event Player).KillIndex_Cache), !=, 0)), (Host Player).KillPosition_Cache));
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
        Else If(And(And(Compare((Event Player).E, ==, 2), Compare(Count Of((Event Player).BounceIndex_Cache), !=, 0)), (Host Player).BouncePosition_Cache));
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
        Wait(0.016, Ignore Condition);
    }
}

rule ("Editor | toggle orb functions") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Event Player == Host Player;
        (Event Player).E == 2;
        Is Button Held(Event Player, Button(Ultimate)) == True;
        Or(Or(Is Button Held(Event Player, Button(Primary Fire)), Is Button Held(Event Player, Button(Secondary Fire))), Is Button Held(Event Player, Button(Ability 2))) == True;
        Count Of(Global.TQ) != 0;
    }
    actions {
        If(Is Button Held(Event Player, Button(Primary Fire)));
            Set Global Variable At Index(TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), Not(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1))));
        Else If(Is Button Held(Event Player, Button(Secondary Fire)));
            Set Global Variable At Index(TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), Not(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1))));
        Else;
            Set Global Variable At Index(BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), Not(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1))));
            Set Global Variable At Index(EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), If-Then-Else(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), 0, 10));
        End;
        Call Subroutine(UpdateCache);
        Wait(0.016, Ignore Condition);
    }
}

rule ("Editor | orb radi/strength") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Event Player == Host Player;
        (Event Player).E > 0;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        Or(Is Button Held(Event Player, Button(Jump)), Is Button Held(Event Player, Button(Crouch))) == True;
        Is Button Held(Event Player, Button(Interact)) == False;
    }
    actions {
        If(And(Compare((Event Player).E, ==, 2), Compare(Count Of((Event Player).BounceIndex_Cache), >, 0)));
            Modify Global Variable At Index(EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1), Add, If-Then-Else(Is Button Held(Event Player, Button(Jump)), 0.1, -0.1));
        Else If(And(Compare((Event Player).E, ==, 1), Compare(Count Of((Event Player).KillIndex_Cache), >, 0)));
            Modify Global Variable At Index(I, Value In Array((Host Player).KillIndex_Cache, Global.J), Add, If-Then-Else(Is Button Held(Event Player, Button(Jump)), 0.1, -0.1));
        End;
        Wait(0.1, Ignore Condition);
        Loop If Condition Is True;
        Call Subroutine(UpdateCache);
    }
}

rule ("Editor | move orbs") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Event Player == Host Player;
        (Event Player).E > 0;
        Is Button Held(Event Player, Button(Ability 2)) == True;
        Or(Is Button Held(Event Player, Button(Primary Fire)), Is Button Held(Event Player, Button(Secondary Fire))) == True;
    }
    actions {
        If(And(Compare((Event Player).E, ==, 1), Compare(Count Of((Event Player).KillIndex_Cache), >, 0)));
            While(And(Is Button Held(Event Player, Button(Ability 2)), Or(Is Button Held(Event Player, Button(Primary Fire)), Is Button Held(Event Player, Button(Secondary Fire)))));
                Modify Global Variable(L, Add, Multiply(Facing Direction Of(Event Player), If-Then-Else(Is Button Held(Event Player, Button(Primary Fire)), 0.0625, -0.0625)));
                Wait(0.016, Ignore Condition);
            End;
            Set Global Variable At Index(H, Value In Array((Host Player).KillIndex_Cache, Global.J), Global.L);
        Else If(And(Compare((Event Player).E, ==, 2), Compare(Count Of((Event Player).BounceIndex_Cache), >, 0)));
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

rule ("Editor | select orb") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Event Player == Host Player;
        (Event Player).E > 0;
        Is Button Held(Event Player, Button(Interact)) == True;
        Or(Is Button Held(Event Player, Button(Crouch)), Is Button Held(Event Player, Button(Jump))) == True;
    }
    actions {
        If(Compare((Event Player).E, ==, 1));
            If(Is Button Held(Event Player, Button(Crouch)));
                Set Global Variable(J, Modulo(Subtract(Global.J, 1), Count Of((Event Player).KillIndex_Cache)));
                Set Global Variable(J, If-Then-Else(Compare(Global.J, >=, 0), Global.J, Subtract(Count Of((Event Player).KillIndex_Cache), 1)));
            Else;
                Set Global Variable(J, Modulo(Add(Global.J, 1), Count Of((Event Player).KillIndex_Cache)));
            End;
            Set Global Variable(L, Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)));
        Else If(Compare((Event Player).E, ==, 2));
            If(Is Button Held(Event Player, Button(Crouch)));
                Set Global Variable(TQ1, Modulo(Subtract(Global.TQ1, 1), Count Of((Event Player).BounceIndex_Cache)));
                Set Global Variable(TQ1, If-Then-Else(Compare(Global.TQ1, >=, 0), Global.TQ1, Subtract(Count Of((Event Player).BounceIndex_Cache), 1)));
            Else;
                Set Global Variable(TQ1, Modulo(Add(Global.TQ1, 1), Count Of((Event Player).BounceIndex_Cache)));
            End;
            Set Global Variable(TQ3, Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)));
        End;
        Wait(0.016, Ignore Condition);
    }
}

rule ("Editor | cp size hitbox display") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Event Player == Host Player;
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Ability 1)) == True;
    }
    actions {
        Set Player Variable(Event Player, EffectSizeToggle, Not((Event Player).EffectSizeToggle));
        Wait(0.016, Ignore Condition);
    }
}

rule ("Editor | cp add teleport") {
    event {
        Ongoing - Global;
    }
    conditions {
        (Host Player).EditorOn != False;
        Is Button Held(Host Player, Button(Interact)) == True;
        Is Button Held(Host Player, Button(Reload)) == True;
        Is Button Held(Host Player, Button(Melee)) == False;
        Count Of(Global.A) > 1;
        (Host Player).E == 0;
        (Host Player).A > 0;
    }
    actions {
        Wait Until(Or(Is Button Held(Host Player, Button(Melee)), Not(And(Is Button Held(Host Player, Button(Interact)), Is Button Held(Host Player, Button(Reload))))), 0.5);
        Abort If(Or(Is Button Held(Host Player, Button(Melee)), And(Is Button Held(Host Player, Button(Interact)), Is Button Held(Host Player, Button(Reload)))));
        Set Global Variable At Index(A, (Host Player).A, Array(If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), !=, 0), First Of(Value In Array(Global.A, (Host Player).A)), Value In Array(Global.A, (Host Player).A)), Position Of(Host Player)));
        Small Message(All Players(All Teams), Custom String("   Teleport has been added for checkpoint {0}", (Host Player).A, Null, Null));
        Wait(0.016, Ignore Condition);
    }
}

rule ("Editor | move cp once") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Event Player == Host Player;
        Is Button Held(Event Player, Button(Ultimate)) == True;
        Is Button Held(Event Player, Button(Interact)) == True;
    }
    actions {
        "smallMessage(getAllPlayers(), \"   Checkpoint {0} has been deleted\".format(hostPlayer.CurrentCheckpoint) if len(CheckpointPositions[hostPlayer.CurrentCheckpoint]) != 0 else \"\")"
        Set Global Variable At Index(A, (Host Player).A, Subtract(Position Of(Event Player), Vector(0, 0, 0)));
        Small Message(All Players(All Teams), Custom String("   Checkpoint has been moved to your position", Null, Null, Null));
        Wait(0.016, Ignore Condition);
    }
}

rule ("Editor | move cp slowly") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).EditorOn != False;
        Event Player == Host Player;
        (Event Player).E == 0;
        "@Condition eventPlayer.isHoldingButton(Button.PRIMARY_FIRE)"
        Is Button Held(Event Player, Button(Ultimate)) == True;
        Count Of(Global.A) > 0;
    }
    actions {
        "@Condition eventPlayer.isHoldingButton(Button.PRIMARY_FIRE) == false\r\n@Condition eventPlayer.isHoldingButton(Button.SECONDARY_FIRE) == false"
        Wait(0.5, Abort When False);
        Set Move Speed(Event Player, 3);
        Start Camera(Event Player, Add(Add(Eye Position(Event Player), Multiply(Facing Direction Of(Event Player), -2.5)), Vector(0, 0.5, 0)), Eye Position(Event Player), 15);
        "while eventPlayer.isHoldingButton(Button.CROUCH) and eventPlayer.EditModeSelection == 0 and eventPlayer.isHoldingButton(Button.PRIMARY_FIRE) == false and eventPlayer.isHoldingButton(Button.SECONDARY_FIRE) == false:"
        While(And(And(Is Button Held(Event Player, Button(Ultimate)), Compare((Event Player).E, ==, 0)), Is Alive(Event Player)));
            Set Global Variable At Index(A, (Event Player).A, Position Of(Event Player));
            Wait(0.016, Ignore Condition);
        End;
        Stop Camera(Event Player);
        Set Move Speed(Event Player, 100);
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
        "version 1.7"
        Disable Built-In Game Mode Completion;
        Disable Built-In Game Mode Scoring;
        Disable Built-In Game Mode Music;
        Disable Built-In Game Mode Announcer;
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
        Set Global Variable(PortalOn, Workshop Setting Toggle(Custom String("map settings", Null, Null, Null), Custom String("enable portals (control maps)", Null, Null, Null), ${portalon}, 0));
        "SelectedCheckpoint_Editing = len(CheckpointPositions) - 1 # This probably isn't necessary"
        Set Global Variable(CompMode, Workshop Setting Toggle(Custom String("Competitive mode", Null, Null, Null), Custom String("Turn on competitive mode", Null, Null, Null), ${compon}, 100));
        If(Global.CompMode);
            "-! comp minutes !- \r\n 5-240"
            Set Global Variable(CompTime, Workshop Setting Integer(Custom String("Competitive mode", Null, Null, Null), Custom String("time limit", Null, Null, Null), ${comptime}, 1, 240, 101));
            "-! comp attempt count !-"
            Set Global Variable(CompAtmpNum, Workshop Setting Integer(Custom String("Competitive mode", Null, Null, Null), Custom String("attempt count", Null, Null, Null), ${compattempt}, 0, 500, 102));
            "-! comp restartlimiter !-"
            Set Global Variable(CompRestartLimit, Workshop Setting Toggle(Custom String("Competitive mode", Null, Null, Null), Custom String("disable restart during run", Null, Null, Null), ${comprestarts}, 103));
            Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Custom String("                                                                                                                           ", Null, Null, Null), Null, Null, Top, -183, Color(White), Null, Null, Visible To, Default Visibility);
            "replace the instructions custom string for your own instructions. type \\n for enter/next line"
            If(First Of(Global.instructiontext));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, First Of(Global.instructiontext), Top, -182, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            If(Value In Array(Global.instructiontext, 1));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, Value In Array(Global.instructiontext, 1), Top, -181, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            If(Value In Array(Global.instructiontext, 2));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, Value In Array(Global.instructiontext, 2), Top, -180, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            If(Value In Array(Global.instructiontext, 3));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, Value In Array(Global.instructiontext, 3), Top, -179, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Custom String("                                   Press {0} to start                                ", Input Binding String(Button(Interact)), Null, Null), Null, Null, Top, -178, Color(White), Null, Null, Visible To and String, Default Visibility);
        Else;
            Create HUD Text(All Players(All Teams), Null, Null, Custom String("Hold {0} | Spectate{1}", Input Binding String(Button(Interact)), If-Then-Else((Local Player).F, Custom String(" | ON", Null, Null, Null), Custom String("", Null, Null, Null)), Null), Right, -158, Null, Null, If-Then-Else((Local Player).F, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
            Create HUD Text(All Players(All Teams), Null, Null, Custom String("Hold {0} | invisible{1}", Input Binding String(Button(Ability 2)), If-Then-Else((Local Player).invis, Custom String(" | ON", Null, Null, Null), Custom String("", Null, Null, Null)), Null), Right, -157, Null, Null, If-Then-Else((Local Player).invis, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
            Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
            Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0} + {1} | Practice{2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Melee)), If-Then-Else((Local Player).PracticeToggle, Custom String(" | ({0})", (Local Player).PracticeCheckpoint, Null, Null), Custom String("", Null, Null, Null))), Right, -153, Null, Null, If-Then-Else((Local Player).PracticeToggle, Color(Green), If-Then-Else((Local Player).C, Color(Gray), Color(White))), Visible To String and Color, Default Visibility);
            Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
            Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).PracticeToggle), Null, Custom String("{0} + {1} | Next level\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Previous level\n{2} | Start from practice cp ", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Interact)))), Null, Right, -152, Null, Color(Lime Green), Null, Visible To String and Color, Default Visibility);
            Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        End;
        Call Subroutine(CreateLeaderBoard);
        "padding for custom hud display"
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nv", Null, Null, Null), Top, -164, Null, Null, Color(Orange), Visible To, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0}+{1}+{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 2)), Custom String("{0} | Restart\nHold {1} | leaderboard", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)), Null)), Right, -161, Null, Null, Color(White), Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0} {1} |  {2}", If-Then-Else((Local Player).quick_restart, Custom String("", Null, Null, Null), Custom String("Hold", Null, Null, Null)), Input Binding String(Button(Reload)), If-Then-Else((Local Player).quick_restart, Custom String("Quick reset", Null, Null, Null), Custom String("Enable Quick reset", Null, Null, Null))), Right, -159, Null, Null, Color(White), Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("{0}+{1} | Invincible{2}", Input Binding String(Button(Reload)), Input Binding String(Button(Melee)), If-Then-Else((Local Player).C, Custom String(" | ON", Null, Null, Null), Custom String("", Null, Null, Null))), Right, -160, Null, Null, If-Then-Else((Local Player).C, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("Hold {0} | Preview orb/portal", Input Binding String(Button(Primary Fire)), Null, Null), Right, -155, Null, Null, If-Then-Else((Local Player).PreviewsArray, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        Create HUD Text(If-Then-Else((Local Player).PreviewsArray, All Players(All Teams), Null), Null, Custom String("Walk left/right | preview others\nAim | change preview angle", Null, Null, Null), Null, Right, -154, Null, Color(Lime Green), Null, Visible To and String, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("Hold {0} | Splits{1}", Input Binding String(Button(Ultimate)), If-Then-Else((Local Player).splitson, Custom String(" | ON ", Null, Null, Null), Custom String("", Null, Null, Null)), Null), Right, -156, Null, Null, If-Then-Else((Local Player).splitson, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        "text per cp"
        If(Compare(Global.CpHudText, !=, Null));
            "hudSubtext(getAllPlayers(), \"                                                   \\r\\n  \\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\", HudPosition.TOP, HO.filler_custommsg, Color.ORANGE, HudReeval.VISIBILITY, SpecVisibility.DEFAULT)"
            Create HUD Text(All Players(All Teams), If-Then-Else(Array Contains(Global.CpHudCp, (Local Player).A), Value In Array(Global.CpHudText, Index Of Array Value(Global.CpHudCp, (Local Player).A)), Custom String("", Null, Null, Null)), Null, Null, Top, -172, Color(Blue), Null, Null, Visible To and String, Default Visibility);
        End;
        If(Compare(Global.CpIwtText, !=, Null));
            Create In-World Text(All Players(All Teams), If-Then-Else(Array Contains(Global.CpIwtCp, (Local Player).A), Value In Array(Global.CpIwtText, Index Of Array Value(Global.CpIwtCp, (Local Player).A)), Custom String("", Null, Null, Null)), Value In Array(Global.CpIwtPos, Index Of Array Value(Global.CpIwtCp, (Local Player).A)), 2, Clip Against Surfaces, Visible To Position and String, Global.CpIwtColor, Default Visibility);
        End;
        If(Not((Host Player).EditorOn));
            Set Global Variable(Difficultyhud, Workshop Setting Combo(Custom String("map settings", Null, Null, Null), Custom String("difficulty (display hud)", Null, Null, Null),  ${difficultyhud}, Array(Custom String("beginner", Null, Null, Null), Custom String("easy-", Null, Null, Null), Custom String("easy", Null, Null, Null), Custom String("easy+", Null, Null, Null), Custom String("medium-", Null, Null, Null), Custom String("medium", Null, Null, Null), Custom String("medium+", Null, Null, Null), Custom String("hard-", Null, Null, Null), Custom String("hard", Null, Null, Null), Custom String("hard+", Null, Null, Null), Custom String("very hard-", Null, Null, Null), Custom String("very hard", Null, Null, Null), Custom String("very hard+", Null, Null, Null), Custom String("extreme-", Null, Null, Null), Custom String("extreme", Null, Null, Null), Custom String("extreme+", Null, Null, Null), Custom String("hell", Null, Null, Null), Custom String("don't display", Null, Null, Null)), 0));
            "17th entry is dont display"
            If(Compare(Global.Difficultyhud, <, 17));
                Create HUD Text(All Players(All Teams), Null, Value In Array(Array(Custom String("beginner", Null, Null, Null), Custom String("easy -", Null, Null, Null), Custom String("easy", Null, Null, Null), Custom String("easy +", Null, Null, Null), Custom String("medium -", Null, Null, Null), Custom String("medium", Null, Null, Null), Custom String("medium +", Null, Null, Null), Custom String("hard -", Null, Null, Null), Custom String("hard", Null, Null, Null), Custom String("hard +", Null, Null, Null), Custom String("very hard -", Null, Null, Null), Custom String("very hard", Null, Null, Null), Custom String("very hard +", Null, Null, Null), Custom String("extreme -", Null, Null, Null), Custom String("extreme", Null, Null, Null), Custom String("extreme +", Null, Null, Null), Custom String("hell", Null, Null, Null)), Global.Difficultyhud), Null, Top, -175, Null, Value In Array(Array(Color(Green), Color(Lime Green), Color(Lime Green), Color(Lime Green), Color(Yellow), Color(Yellow), Color(Yellow), Color(Orange), Color(Orange), Color(Orange), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Color(Red), Color(Red), Color(Red), Custom Color(150, 0, 0, 255)), Global.Difficultyhud), Null, Visible To, Default Visibility);
                Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
            End;
        End;
        Wait(5, Ignore Condition);
        Call Subroutine(KILLBALL);
        Wait(2, Ignore Condition);
        ""
        Call Subroutine(pinball);
        Wait(2, Ignore Condition);
        Call Subroutine(BuildPortals);
        "Check for editor/host spawn to redo effect reeval"
        Wait Until(Has Spawned(Host Player), 99999);
        Wait(0.016, Ignore Condition);
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
        Set Global Variable(TimeRemaining, 265);
        Create HUD Text(All Players(All Teams), Null, Custom String("  Server Restarts In {0} Min  ", Global.TimeRemaining, Null, Null), Null, Right, -162, Null, Color(Red), Null, Visible To and String, Visible Always);
        While(Compare(Global.TimeRemaining, >, 0));
            Wait(60, Ignore Condition);
            Modify Global Variable(TimeRemaining, Subtract, 1);
            If(Global.CompMode);
                Modify Global Variable(CompTime, Subtract, 1);
                If(Compare(Global.CompTime, ==, 0));
                    Big Message(All Players(All Teams), Custom String("time's up", Null, Null, Null));
                    Set Player Variable(All Players(All Teams), CompDone, True);
                    Stop Chasing Player Variable(All Players(All Teams), D);
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

rule ("Player Initialize and game HUD") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    actions {
        "Turn Editor On"
        Set Player Variable(Event Player, EditorOn, Workshop Setting Toggle(Custom String("Editor", Null, Null, Null), Custom String("Editor mode", Null, Null, Null), ${editoron}, 0));
        Set Player Variable(Event Player, K, (Event Player).EditorOn);
        Disable Game Mode HUD(Event Player);
        Enable Death Spectate All Players(Event Player);
        Enable Death Spectate Target HUD(Event Player);
        Preload Hero(Event Player, Hero(Genji));
        Set Respawn Max Time(Event Player, 0);
        Set Player Variable(Event Player, F, False);
        "Climbing the wall prompts the HUD"
        Set Player Variable(Event Player, J, False);
        Set Player Variable(Event Player, TY, 0);
        "big waits first for about 1 second before loading, to make sure things like comp mode are fully loaded and configured, load fx in meanwhile"
        Wait(1, Ignore Condition);
        Create Effect(Event Player, Ring, Color(Sky Blue), Last Of(Value In Array(Global.A, (Event Player).A)), 1, Position and Radius);
        Create Effect(If-Then-Else((Event Player).NotOnLastCp, Event Player, Null), Ring, Color(Lime Green), Value In Array(Global.A, Add((Event Player).A, 1)), 1, Visible To Position and Radius);
        Wait(0.5, Ignore Condition);
        Create Effect(If-Then-Else((Event Player).NotOnLastCp, Event Player, Null), Light Shaft, Color(White), Value In Array(Global.A, Add((Event Player).A, 1)), 1, Visible To Position and Radius);
        Create Icon(If-Then-Else((Event Player).NotOnLastCp, Event Player, Null), Add(Value In Array(Global.A, Add((Event Player).A, 1)), Up), Arrow: Down, Visible To and Position, Color(Sky Blue), True);
        Wait(0.5, Ignore Condition);
        Create In-World Text(If-Then-Else((Event Player).NotOnLastCp, Event Player, Null), If-Then-Else(And((Event Player).BounceLockMax_Cache, Compare(Count Of((Event Player).LockCollected), <, (Event Player).BounceLockMax_Cache)), Custom String("{0} collect orbs first", Icon String(Warning), Null, Null), Custom String("Come here", Null, Null, Null)), Value In Array(Global.A, Add((Event Player).A, 1)), 1.5, Do Not Clip, Visible To Position and String, Color(White), Default Visibility);
        Wait(1, Ignore Condition);
        If(Not(Is Dummy Bot(Event Player)));
            Start Forcing Player To Be Hero(Event Player, Hero(Genji));
        "only do the things on genji test bots"
        Else If(Compare(Hero Of(Event Player), !=, Hero(Genji)));
            Abort;
        End;
        Wait Until(Has Spawned(Event Player), 9999);
        If(Global.CompMode);
            Set Invisible(Event Player, All);
            Create HUD Text(Event Player, Custom String(" ", Null, Null, Null), If-Then-Else(Compare(Global.CompTime, <=, 0), Custom String("! competition is over !", Null, Null, Null), Custom String("time left: {0} min{1}", Global.CompTime, If-Then-Else(Compare((Event Player).AttemptCount, ==, -1), Custom String("\nYou are out of attemps", Null, Null, Null), If-Then-Else(Compare(Global.CompAtmpNum, >, 0), Custom String("\nAttempt {0} / {1}", (Event Player).AttemptCount, Global.CompAtmpNum, Null), Custom String("", Null, Null, Null))), Null)), If-Then-Else(Compare(Global.CompTime, >, 0), Custom String("competitive mode", Null, Null, Null), Custom String("competitive mode\n\n\n", Null, Null, Null)), Top, -184, Color(Yellow), Color(Yellow), Color(Yellow), String, Default Visibility);
            "instructions and settings for comp start"
            If(Not(Array Contains(Global.CompAtmpSaveNames, Custom String("{0}", Event Player, Null, Null))));
                Set Player Variable(Event Player, instructionhud, True);
                Modify Global Variable(CompAtmpSaveNames, Append To Array, Custom String("{0}", Event Player, Null, Null));
                Modify Global Variable(CompAtmpSaveCount, Append To Array, 1);
                Set Player Variable(Event Player, AttemptCount, 1);
                Set Move Speed(Event Player, 0);
                Set Ability 1 Enabled(Event Player, False);
                Set Ultimate Ability Enabled(Event Player, False);
                Wait Until(Not(Is Button Held(Event Player, Button(Interact))), 1);
                Wait Until(Or(Is Button Held(Event Player, Button(Interact)), Compare(Global.CompTime, <, 1)), 99999);
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
        "ban icons in level"
        Create HUD Text(Event Player, Null, If-Then-Else((Event Player).PracticeToggle, Custom String("Practice Time {0}", Custom String("{0} sec", (Event Player).practicetimer, Null, Null), Null, Null), Custom String("", Null, Null, Null)), Custom String("Time {0}", Custom String("{0} sec", (Event Player).D, Null, Null), Null, Null), Left, -196, Color(White), Color(Gray), Color(White), String, Default Visibility);
        Create HUD Text(Event Player, Null, If-Then-Else((Event Player).BounceLockMax_Cache, Custom String("orange orbs {0} / {1}", Count Of((Event Player).LockCollected), (Event Player).BounceLockMax_Cache, Null), Custom String("", Null, Null, Null)), Custom String("{0}{1}Level {2}", If-Then-Else((Event Player).banstring, (Event Player).banstring, Custom String("", Null, Null, Null)), If-Then-Else((Event Player).banstring, Custom String("\n", Null, Null, Null), Custom String("", Null, Null, Null)), Custom String("{0} / {1}", (Event Player).A, Subtract(Count Of(Global.A), 1), Null)), Top, -174, Color(White), Color(Orange), Color(White), String, Default Visibility);
        "climb/bhop indicators"
        Create HUD Text(Event Player, Custom String("Climb{0}", If-Then-Else(Compare((Event Player).climbNum, <, 1), Custom String("", Null, Null, Null), Custom String(" ({0})", (Event Player).climbNum, Null, Null)), Null, Null), Null, Null, Left, -194, If-Then-Else((Event Player).J, Color(Red), Color(Green)), Null, Null, String and Color, Default Visibility);
        Create HUD Text(Event Player, Custom String("Bhop", Null, Null, Null), Null, Null, Left, -195, If-Then-Else(Compare((Event Player).O, ==, 0), Color(Green), (Event Player).CH), Null, Null, Color, Default Visibility);
        Wait(0.016, Ignore Condition);
        "initialization of the game"
        Call Subroutine(Sub1);
    }
}

rule ("delete save") {
    event {
        Subroutine;
        DeleteSave;
    }
    actions {
        Modify Global Variable(SaveName, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
        Modify Global Variable(SaveCp, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
        Modify Global Variable(SaveTimer, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
        Modify Global Variable(SaveElapsed, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
        Modify Global Variable(SavePauseTime, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
        Modify Global Variable(SavePauseEnabled, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
        "must always be last because its the index itself"
        Modify Global Variable(SaveEnt, Remove From Array By Index, Index Of Array Value(Global.SaveEnt, Event Player));
    }
}

rule ("make save") {
    event {
        Subroutine;
        MakeSave;
    }
    actions {
        Modify Global Variable(SaveName, Append To Array, Custom String("{0}", Event Player, Null, Null));
        Modify Global Variable(SaveCp, Append To Array, (Event Player).A);
        Modify Global Variable(SaveTimer, Append To Array, (Event Player).D);
        Modify Global Variable(SaveEnt, Append To Array, Event Player);
        Modify Global Variable(SaveElapsed, Append To Array, Total Time Elapsed);
        Modify Global Variable(SavePauseTime, Append To Array, 0);
        Modify Global Variable(SavePauseEnabled, Append To Array, False);
    }
}

rule ("start pause timer") {
    event {
        Subroutine;
        StartPauseTimer;
    }
    actions {
        Chase Player Variable At Rate(Event Player, ztjs, 999999, 1, None);
        Set Global Variable At Index(SaveTimer, Index Of Array Value(Global.SaveEnt, Event Player), (Event Player).D);
        Set Global Variable At Index(SaveElapsed, Index Of Array Value(Global.SaveEnt, Event Player), Total Time Elapsed);
        Set Global Variable At Index(SavePauseEnabled, Index Of Array Value(Global.SaveEnt, Event Player), True);
    }
}

rule ("stop pause timer") {
    event {
        Subroutine;
        StopPauseTimer;
    }
    actions {
        Stop Chasing Player Variable(Event Player, ztjs);
        Set Global Variable At Index(SavePauseTime, Index Of Array Value(Global.SaveEnt, Event Player), (Event Player).ztjs);
        Set Player Variable(Event Player, ztjs, 0);
        Set Global Variable At Index(SavePauseEnabled, Index Of Array Value(Global.SaveEnt, Event Player), False);
    }
}

rule ("leaderboard hud") {
    event {
        Subroutine;
        CreateLeaderBoard;
    }
    actions {
        "turns into global rule so it doesnt delete when player leaves"
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
        While(Compare(Count Of(Global.LeaderBoardHuds), >, 0));
            Destroy HUD Text(First Of(Global.LeaderBoardHuds));
            Modify Global Variable(LeaderBoardHuds, Remove From Array By Index, 0);
        End;
        "top 5"
        If(First Of(Global.LeaderBoardFull));
            Create HUD Text(All Players(All Teams), Null, Null, Custom String(" \n{0} Top 5 {0}", Ability Icon String(Hero(Genji), Button(Primary Fire)), Null, Null), Right, -149, Null, Null, Color(White), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(First Of(Global.LeaderBoardFull)), Value In Array(First Of(Global.LeaderBoardFull), 2), Right, -148, Color(Red), Color(Red), Color(Red), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 1));
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 1)), Value In Array(Value In Array(Global.LeaderBoardFull, 1), 2), Right, -147, Color(Orange), Color(Orange), Color(Orange), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 2));
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 2)), Value In Array(Value In Array(Global.LeaderBoardFull, 2), 2), Right, -146, Color(Yellow), Color(Yellow), Color(Yellow), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 3));
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 3)), Value In Array(Value In Array(Global.LeaderBoardFull, 3), 2), Right, -145, Color(Lime Green), Color(Lime Green), Color(Lime Green), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 4));
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 4)), Value In Array(Value In Array(Global.LeaderBoardFull, 4), 2), Right, -144, Color(Green), Color(Green), Color(Green), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　 {0} Leaderboard {0} 　　　", Icon String(Flag), Null, Null), Null, Null, Top, -169, Color(Blue), Null, Null, Visible To, Visible Never);
        Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　　　　　　　　　　　　　　　\n　 1:　{0} - {1}　\n　 2:　{2}", If-Then-Else(First Of(Global.LeaderBoardFull), First Of(First Of(Global.LeaderBoardFull)), Custom String("", Null, Null, Null)), If-Then-Else(First Of(Global.LeaderBoardFull), Value In Array(First Of(Global.LeaderBoardFull), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 3:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 1), First Of(Value In Array(Global.LeaderBoardFull, 1)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 1), Value In Array(Value In Array(Global.LeaderBoardFull, 1), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 4:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 2), First Of(Value In Array(Global.LeaderBoardFull, 2)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 2), Value In Array(Value In Array(Global.LeaderBoardFull, 2), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 5:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 3), First Of(Value In Array(Global.LeaderBoardFull, 3)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 3), Value In Array(Value In Array(Global.LeaderBoardFull, 3), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 4), First Of(Value In Array(Global.LeaderBoardFull, 4)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 4), Value In Array(Value In Array(Global.LeaderBoardFull, 4), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -168, Color(White), Null, Null, Visible To, Default Visibility);
        Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        If(Value In Array(Global.LeaderBoardFull, 5));
            Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　　　　　　　　　　　　　　　\n　 6:　{0} - {1}　\n　 7:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 5), First Of(Value In Array(Global.LeaderBoardFull, 5)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 5), Value In Array(Value In Array(Global.LeaderBoardFull, 5), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 8:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 6), First Of(Value In Array(Global.LeaderBoardFull, 6)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 6), Value In Array(Value In Array(Global.LeaderBoardFull, 6), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 9:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 7), First Of(Value In Array(Global.LeaderBoardFull, 7)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 7), Value In Array(Value In Array(Global.LeaderBoardFull, 7), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　10:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 8), First Of(Value In Array(Global.LeaderBoardFull, 8)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 8), Value In Array(Value In Array(Global.LeaderBoardFull, 8), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 9)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 9), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -167, Color(White), Null, Null, Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 10));
            Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　　　　　　　　　　　　　　　\n　11:　{0} - {1}　\n　12:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 10)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 10), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　13:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 11)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 11), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　14:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 12)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 12), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　15:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 13)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 13), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 14)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 14), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -166, Color(White), Null, Null, Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 15));
            Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　　　　　　　　　　　　　　　\n　16:　{0} - {1}　\n　17:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 15)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 15), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　18:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 16)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 16), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　19:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 17)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 17), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　20:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 18)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 18), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 19)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 19), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -165, Color(White), Null, Null, Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
    }
}

rule ("SUB | Leaderboard Update") {
    event {
        Subroutine;
        Leaderboardupdate;
    }
    actions {
        "[i[0] for i in var1]   list of first element of each in var 1\r\n [ [name, seconds, prettytime] ]\r\n you already have a time"
        If(Array Contains(Mapped Array(Global.LeaderBoardFull, First Of(Current Array Element)), Custom String("{0}", Event Player, Null, Null)));
            "new time worse"
            If(Compare((Event Player).D, >, Value In Array(First Of(Filtered Array(Global.LeaderBoardFull, Compare(First Of(Current Array Element), ==, Custom String("{0}", Event Player, Null, Null)))), 1)));
                Skip(19);
            "new time better"
            Else;
                Modify Global Variable(LeaderBoardFull, Remove From Array By Value, Filtered Array(Global.LeaderBoardFull, Compare(First Of(Current Array Element), ==, Custom String("{0}", Event Player, Null, Null))));
                Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player, Null, Null), (Event Player).D, Custom String("{0} sec", (Event Player).D, Null, Null))));
                Call Subroutine(CreateLeaderBoard);
            End;
        "you are not in list yet"
        Else;
            "board has room for more"
            If(Compare(Count Of(Global.LeaderBoardFull), <, 20));
                Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player, Null, Null), (Event Player).D, Custom String("{0} sec", (Event Player).D, Null, Null))));
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
                    Call Subroutine(CreateLeaderBoard);
                End;
            End;
        End;
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
        Apply Impulse(Event Player, Down, Speed Of(Event Player), To Player, Cancel Contrary Motion);
        Set Status(Event Player, Null, Rooted, 0.1);
        Teleport(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)));
        If(And(And((Event Player).ban_dedhop, Compare((Event Player).C, ==, False)), (Event Player).NotOnLastCp));
            "if eventPlayer.isOnWall():\r\nsmallMessage(eventPlayer, \"Deathbhop is banned!\")"
            Disallow Button(Event Player, Button(Jump));
            Wait(0.1, Ignore Condition);
            Allow Button(Event Player, Button(Jump));
        End;
        If(And(Compare((Event Player).A, ==, 0), Not((Event Player).PracticeToggle)));
            Set Player Variable(Event Player, D, 0);
            Set Player Variable(Event Player, splittime, 0);
        End;
        If(Is Using Ultimate(Event Player));
            Kill(Event Player, Null);
            Wait(0.016, Ignore Condition);
        End;
        Start Rule(CheckUlt, Restart Rule);
        Start Rule(CheckDash, Restart Rule);
    }
}

rule ("SUB | Start Game") {
    event {
        Subroutine;
        Sub1;
    }
    actions {
        If(And(Global.CompMode, Or(Compare(Global.CompTime, <, 1), (Event Player).CompDone)));
            Set Player Variable(Event Player, LeaderboardToggle, True);
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
            If(Array Contains(Global.SaveName, Custom String("{0}", Event Player, Null, Null)));
                Set Global Variable At Index(SaveEnt, Index Of Array Value(Global.SaveName, Custom String("{0}", Event Player, Null, Null)), Event Player);
                Set Player Variable(Event Player, A, Value In Array(Global.SaveCp, Index Of Array Value(Global.SaveEnt, Event Player)));
                Set Player Variable(Event Player, D, Value In Array(Global.SaveTimer, Index Of Array Value(Global.SaveEnt, Event Player)));
                Set Global Variable At Index(SaveElapsed, Index Of Array Value(Global.SaveEnt, Event Player), Total Time Elapsed);
                Set Global Variable At Index(SavePauseTime, Index Of Array Value(Global.SaveEnt, Event Player), 0);
                Set Global Variable At Index(SavePauseEnabled, Index Of Array Value(Global.SaveEnt, Event Player), False);
                Teleport(Event Player, Add(Value In Array(Global.A, (Event Player).A), Up));
            Else;
                Teleport(Event Player, Add(First Of(Global.A), Up));
                Set Player Variable(Event Player, A, 0);
                Set Player Variable(Event Player, D, 0);
                Stop Chasing Player Variable(Event Player, ztjs);
                Set Player Variable(Event Player, ztjs, 0);
                Call Subroutine(MakeSave);
            End;
        End;
        Set Player Variable(Event Player, splittime, 0);
        Chase Player Variable At Rate(Event Player, D, 9999999, 1, None);
        Set Status(Event Player, Null, Phased Out, 9999);
        Set Status(Event Player, Null, Invincible, 9999);
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Set Player Variable(Event Player, C, False);
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
        Abort If(Or(Or(Or(Or(Compare(Global.TitleData, ==, Null), Global.CompMode), (Event Player).PracticeToggle), (Event Player).EditorOn), Not(Array Contains(First Of(Global.TitleData), (Event Player).A))));
        Destroy In-World Text((Event Player).TitleStore);
        Create In-World Text(If-Then-Else((Event Player).invis, Null, All Players(All Teams)), Value In Array(Value In Array(Global.TitleData, 1), Index Of Array Value(First Of(Global.TitleData), (Event Player).A)), Event Player, 1.1, Clip Against Surfaces, Visible To and Position, Value In Array(Value In Array(Global.TitleData, 2), Index Of Array Value(First Of(Global.TitleData), (Event Player).A)), Default Visibility);
        Set Player Variable(Event Player, TitleStore, Last Text ID);
    }
}

rule ("SUB | Kill Orb Effects") {
    event {
        Subroutine;
        KILLBALL;
    }
    actions {
        Abort If(Or(Compare(Global.H, ==, Empty Array), (Host Player).EditorOn));
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
        Abort If(Or(Compare(Global.TQ, ==, Empty Array), (Host Player).EditorOn));
        For Global Variable(NANBA, 0, Count Of(Global.TQ), 1);
            Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null), And(Compare((Current Array Element).A, ==, Value In Array(Global.pinballnumber, Evaluate Once(Global.NANBA))), Not(Array Contains((Current Array Element).LockCollected, Value In Array(Global.TQ, Evaluate Once(Global.NANBA)))))), Orb, If-Then-Else(Value In Array(Global.BounceToggleLock, Global.NANBA), Color(Orange), Color(Green)), Value In Array(Global.TQ, Evaluate Once(Global.NANBA)), 1, Visible To);
            Modify Global Variable(TQ2, Append To Array, Last Created Entity);
            Wait(0.016, Ignore Condition);
        End;
    }
}

rule ("Arrive | Ground reset | traces") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        Is On Ground(Event Player) == True;
        Is Alive(Event Player) == True;
    }
    actions {
        If(Compare((Event Player).A, ==, Subtract(Count Of(Global.A), 1)));
            If(And(And(And(And(Is Moving(Event Player), Compare((Event Player).PracticeToggle, ==, False)), Compare((Event Player).invis, ==, False)), Compare((Event Player).EditorOn, ==, False)), Compare(Global.CompMode, ==, False)));
                "traces ----------------------------------------------------------------------------------------------------"
                Set Player Variable(Event Player, finishfxcache, Value In Array(Array(Color(Red), Color(Orange), Color(Yellow), Color(Lime Green), Color(Green), Color(Turquoise), Color(Blue), Color(Purple), Color(Violet), Color(Rose)), Modulo(Round To Integer(Multiply(Total Time Elapsed, 2), Down), 10)));
                "eventPlayer.finishfxcache =  rgb((cosDeg(getTotalTimeElapsed()/2 * 360 - 0) + 0.5) * 255, (cosDeg(getTotalTimeElapsed/2 * 360 - 120) + 0.5) * 255, (cosDeg(getTotalTimeElapsed/2 * 360 - 240) + 0.5) * 255)"
                Wait(0.16, Ignore Condition);
                "1.6 - 0.2 in 0.2 steps"
                Play Effect(All Players(All Teams), Ring Explosion, (Event Player).finishfxcache, Position Of(Event Player), 1.4);
                Play Effect(All Players(All Teams), Ring Explosion, (Event Player).finishfxcache, Position Of(Event Player), 1.2);
                Play Effect(All Players(All Teams), Ring Explosion, (Event Player).finishfxcache, Position Of(Event Player), 1);
                Play Effect(All Players(All Teams), Ring Explosion, (Event Player).finishfxcache, Position Of(Event Player), 0.8);
                Play Effect(All Players(All Teams), Ring Explosion, (Event Player).finishfxcache, Position Of(Event Player), 0.6);
                Play Effect(All Players(All Teams), Ring Explosion, (Event Player).finishfxcache, Position Of(Event Player), 0.4);
                Wait(0.128, Ignore Condition);
            End;
        Else If(And(And(And((Event Player).NotOnLastCp, Compare((Event Player).C, ==, False)), Or(Compare(Global.CompMode, ==, False), Compare(Global.CompTime, >, 0))), Compare((Event Player).LockState, ==, False)));
            If(Compare(Distance Between(Event Player, Value In Array(Global.A, Add((Event Player).A, 1))), <=, 1.4));
                "arrived ----------------------------------------------------------------------------------------------------"
                Set Player Variable(Event Player, MovedCheckpoint, True);
                "kill player if not colleted the locks"
                If(And((Event Player).BounceLockMax_Cache, Compare(Count Of((Event Player).LockCollected), <, (Event Player).BounceLockMax_Cache)));
                    Small Message(Event Player, Custom String("   ! collect ALL orange orbs to unlock !", Null, Null, Null));
                    Kill(Event Player, Null);
                    Skip(46);
                End;
                Set Player Variable(Event Player, LockCollected, Empty Array);
                Modify Player Variable(Event Player, A, Add, 1);
                Call Subroutine(UpdateCache);
                Set Player Variable(Event Player, splitdisplay, Subtract(If-Then-Else((Event Player).PracticeToggle, (Event Player).practicetimer, (Event Player).D), (Event Player).splittime));
                Wait(0.016, Ignore Condition);
                Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
                Play Effect(If-Then-Else(Or(Global.CompMode, (Event Player).invis), Event Player, All Players(All Teams)), Ring Explosion, Color(Sky Blue), Add(Value In Array(Global.A, (Event Player).A), Vector(0, 1.5, 0)), 4);
                Big Message(Event Player, Custom String("Arrived at {0} / {1}{2}", (Event Player).A, Subtract(Count Of(Global.A), 1), If-Then-Else((Event Player).splitson, Custom String(" - Split {0}", (Event Player).splitdisplay, Null, Null), Custom String("", Null, Null, Null))));
                Wait(0.016, Ignore Condition);
                Call Subroutine(UpdateTitle);
                If(Is Using Ultimate(Event Player));
                    Kill(Event Player, Null);
                End;
                If((Event Player).PracticeToggle);
                    Set Player Variable(Event Player, splittime, (Event Player).practicetimer);
                    Skip(29);
                End;
                Set Player Variable(Event Player, splittime, (Event Player).D);
                "complete lvl"
                If(And(And(Compare((Event Player).A, ==, Subtract(Count Of(Global.A), 1)), Not((Event Player).EditorOn)), Not((Event Player).PracticeToggle)));
                    Stop Chasing Player Variable(Event Player, D);
                    Stop Chasing Player Variable(Event Player, practicetimer);
                    Wait(0.016, Ignore Condition);
                    Big Message(All Players(All Teams), Custom String("Mission complete! Time {0}", Custom String("{0} sec", (Event Player).D, Null, Null), Null, Null));
                    Call Subroutine(DeleteSave);
                    Call Subroutine(Leaderboardupdate);
                    If(And(Global.CompMode, Compare(Global.CompAtmpNum, >, 0)));
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
                "update save"
                Else;
                    Call Subroutine(DeleteSave);
                    Call Subroutine(MakeSave);
                End;
            Else If(Compare(Distance Between(Event Player, Last Of(Value In Array(Global.A, (Event Player).A))), >, 1.4));
                "ground reset ----------------------------------------------------------------------------------------------------"
                Call Subroutine(checkpointFailReset);
            End;
        End;
        Wait(0.048, Ignore Condition);
        Loop If Condition Is True;
    }
}

rule ("Kill Orb | Activate") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).KillPosition_Cache != Empty Array;
        (Event Player).C == False;
        (Event Player).NotOnLastCp != False;
        Is True For Any((Event Player).KillPosition_Cache, Compare(Distance Between(Current Array Element, Event Player), <=, Value In Array((Event Player).KillRadii_Cache, Index Of Array Value((Event Player).KillPosition_Cache, Current Array Element)))) == True;
    }
    actions {
        Call Subroutine(checkpointFailReset);
    }
}

rule ("Bounce Ball / Orb | Activate") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).BouncePosition_Cache != Empty Array;
        "@Condition eventPlayer.NotOnLastCp # disabled coz editor"
        Is True For Any((Event Player).BouncePosition_Cache, Compare(Distance Between(Current Array Element, Add(Position Of(Event Player), Vector(0, 0.7, 0))), <, 1.4)) == True;
    }
    actions {
        Set Player Variable(Event Player, bouncetouched, Index Of Array Value((Event Player).BouncePosition_Cache, First Of(Sorted Array(Filtered Array((Event Player).BouncePosition_Cache, And(Compare(Distance Between(Add(Event Player, Vector(0, 0.7, 0)), Current Array Element), <, 1.4), Not(Array Contains((Event Player).LockCollected, Current Array Element)))), Distance Between(Event Player, Current Array Element)))));
        If(Compare(Value In Array((Event Player).BounceStrength_Cache, (Event Player).bouncetouched), !=, 0));
            Apply Impulse(Event Player, Up, Value In Array((Event Player).BounceStrength_Cache, (Event Player).bouncetouched), To World, Cancel Contrary Motion);
        End;
        If(Value In Array((Event Player).BounceUlt_Cache, (Event Player).bouncetouched));
            Set Ultimate Ability Enabled(Event Player, True);
            Set Ultimate Charge(Event Player, 100);
            Small Message(Event Player, Custom String("   Ultimate is ready", Null, Null, Null));
            Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
        End;
        If(Value In Array((Event Player).BounceLock_Cache, (Event Player).bouncetouched));
            Modify Player Variable(Event Player, LockCollected, Append To Array, Value In Array((Event Player).BouncePosition_Cache, (Event Player).bouncetouched));
            Small Message(Event Player, Custom String("   orb has been collected", Null, Null, Null));
            Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
        End;
        If(Value In Array((Event Player).BounceDash_Cache, (Event Player).bouncetouched));
            If(Is Using Ability 1(Event Player));
                Wait Until(Not(Is Using Ability 1(Event Player)), 1);
                "wait til set false by check"
                Wait(0.032, Ignore Condition);
            End;
            Set Ability 1 Enabled(Event Player, True);
            Small Message(Event Player, Custom String("   Dash is ready", Null, Null, Null));
            Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
        End;
        Wait(0.24, Ignore Condition);
        Loop If Condition Is True;
    }
}

rule ("Death Reset") {
    event {
        Player Died;
        All;
        All;
    }
    conditions {
        (Event Player).F == False;
        (Event Player).CompDone == False;
    }
    actions {
        "@Condition len(CheckpointPositions) >= 2"
        Clear Status(Event Player, Phased Out);
        Resurrect(Event Player);
        Call Subroutine(checkpointFailReset);
    }
}

rule ("Player Phase") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Has Status(Event Player, Phased Out) == False;
        Is Alive(Event Player) == True;
    }
    actions {
        Set Status(Event Player, Null, Phased Out, 9999);
        Set Status(Event Player, Null, Invincible, 9999);
    }
}

rule ("Player Leaves") {
    event {
        Player Left Match;
        All;
        All;
    }
    actions {
        "delete if player didnt do first cp"
        If(Compare(Value In Array(Global.SaveCp, Index Of Array Value(Global.SaveEnt, Event Player)), ==, 0));
            Call Subroutine(DeleteSave);
        Else;
            Skip If(Or(Compare(Value In Array(Global.SaveCp, Index Of Array Value(Global.SaveEnt, Event Player)), >=, Subtract(Count Of(Global.A), 1)), Value In Array(Global.SavePauseEnabled, Index Of Array Value(Global.SaveEnt, Event Player))), 1);
            Set Global Variable At Index(SaveTimer, Index Of Array Value(Global.SaveEnt, Event Player), Add(Subtract(Subtract(Total Time Elapsed, Value In Array(Global.SaveElapsed, Index Of Array Value(Global.SaveEnt, Event Player))), Value In Array(Global.SavePauseTime, Index Of Array Value(Global.SaveEnt, Event Player))), Value In Array(Global.SaveTimer, Index Of Array Value(Global.SaveEnt, Event Player))));
            Set Global Variable At Index(SavePauseTime, Index Of Array Value(Global.SaveEnt, Event Player), 0);
            Set Global Variable At Index(SavePauseEnabled, Index Of Array Value(Global.SaveEnt, Event Player), False);
    }
}

disabled rule ("------------------------------------------------------------------------ commands ------------------------------------------------------------------------ ") {
    event {
        Ongoing - Global;
    }
}

rule ("Toggle Leaderboard | Hold Melee") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Melee)) == True;
        (Event Player).EditorOn == False;
    }
    actions {
        Wait(1, Abort When False);
        Set Player Variable(Event Player, LeaderboardToggle, Not((Event Player).LeaderboardToggle));
    }
}

rule ("Toggle Splits | Hold Ult") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Ultimate)) == True;
        (Event Player).EditorOn == False;
    }
    actions {
        Wait(1, Abort When False);
        Set Player Variable(Event Player, splitson, Not((Event Player).splitson));
        Play Effect(Event Player, Buff Impact Sound, Null, Event Player, 100);
    }
}

rule ("Toggle Invisible | Hold Deflect") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Ability 2)) == True;
        (Event Player).EditorOn == False;
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

rule ("Preview orbs/portals | Hold Primary") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Primary Fire)) == True;
        (Event Player).EditorOn == False;
    }
    actions {
        Wait Until(Not(Is Button Held(Event Player, Button(Primary Fire))), 0.9);
        Abort If(Not(Is Button Held(Event Player, Button(Primary Fire))));
        Set Player Variable(Event Player, PreviewsArray, Filtered Array(Global.CustomPortalStart, Compare(Value In Array(Global.CustomPortalCP, Index Of Array Value(Global.CustomPortalStart, Current Array Element)), ==, (Event Player).A)));
        Modify Player Variable(Event Player, PreviewsArray, Append To Array, Filtered Array(Global.TQ, And(Compare(Value In Array(Global.pinballnumber, Index Of Array Value(Global.TQ, Current Array Element)), ==, (Event Player).A), Compare(Value In Array(Global.BounceToggleLock, Index Of Array Value(Global.TQ, Current Array Element)), ==, True))));
        Abort If(Or(Or(Compare(Count Of((Event Player).PreviewsArray), <, 1), Compare((Event Player).PreviewsArray, ==, Null)), Not((Event Player).NotOnLastCp)));
        Wait(0.1, Ignore Condition);
        Set Move Speed(Event Player, 0);
        Set Player Variable(Event Player, PreviewsI, 0);
        Start Camera(Event Player, Add(Value In Array((Event Player).PreviewsArray, (Event Player).PreviewsI), Multiply(Facing Direction Of(Event Player), -3.5)), Value In Array((Event Player).PreviewsArray, (Event Player).PreviewsI), 15);
        While(And(Is Button Held(Event Player, Button(Primary Fire)), Is Alive(Event Player)));
            If(Compare(X Component Of(Throttle Of(Event Player)), <, -0.5));
                Set Player Variable(Event Player, PreviewsI, If-Then-Else(Compare(Add((Event Player).PreviewsI, 1), >=, Count Of((Event Player).PreviewsArray)), 0, Add((Event Player).PreviewsI, 1)));
                Wait Until(Compare(X Component Of(Throttle Of(Event Player)), >, -0.5), 1);
            Else If(Compare(X Component Of(Throttle Of(Event Player)), >, 0.5));
                Set Player Variable(Event Player, PreviewsI, If-Then-Else(Compare((Event Player).PreviewsI, ==, 0), Subtract(Count Of((Event Player).PreviewsArray), 1), Subtract((Event Player).PreviewsI, 1)));
                Wait Until(Compare(X Component Of(Throttle Of(Event Player)), <, 0.5), 1);
            End;
            Wait(0.016, Ignore Condition);
        End;
        Stop Camera(Event Player);
        Set Move Speed(Event Player, 100);
        Set Player Variable(Event Player, PreviewsArray, Null);
    }
}

rule ("Restart Run | Crouch + Interact + Deflect") {
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
        If(Global.CompMode);
            Wait(0.016, Ignore Condition);
            If(Compare(Global.CompTime, <, 1));
                Small Message(Event Player, Custom String("   The competition is over", Null, Null, Null));
                Abort;
            Else If((Event Player).CompDone);
                Abort;
            Else If(And(Global.CompRestartLimit, (Event Player).NotOnLastCp));
                Small Message(Event Player, Custom String("   Restart during run is disabled for this competition", Null, Null, Null));
                Abort;
            Else If(Compare(Global.CompAtmpNum, >, 0));
                If(Compare((Event Player).AttemptCount, ==, Global.CompAtmpNum));
                    Small Message(Event Player, Custom String("   You are on your last attempt", Null, Null, Null));
                    Abort;
                End;
                If(Compare((Event Player).AttemptCount, ==, -1));
                    Small Message(Event Player, Custom String("   You are out of attempts", Null, Null, Null));
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
        Set Player Variable(Event Player, PracticeToggle, False);
        Set Player Variable(Event Player, PracticeCheckpoint, 0);
        Set Player Variable(Event Player, C, False);
        Stop Chasing Player Variable(Event Player, practicetimer);
        Set Player Variable(Event Player, practicetimer, 0);
        If(Array Contains(Global.SaveEnt, Event Player));
            Call Subroutine(DeleteSave);
        End;
        If(Is Dead(Event Player));
            Respawn(Event Player);
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

rule ("Enter Spectate | Hold Interact") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Ability 2)) == False;
        Global.CompMode == False;
    }
    actions {
        Wait(1, Abort When False);
        "editor has interact combos"
        If((Event Player).EditorOn);
            Wait(1, Abort When False);
        End;
        Small Message(Event Player, Custom String("   Hold Interact again to turn off spectate mode", Null, Null, Null));
        If((Event Player).F);
            Respawn(Event Player);
            Teleport(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)));
            If((Event Player).NotOnLastCp);
                If((Event Player).PracticeToggle);
                    Chase Player Variable At Rate(Event Player, practicetimer, 9999999, 1, None);
                Else;
                    Chase Player Variable At Rate(Event Player, D, 9999999, 1, None);
                End;
            End;
            Start Rule(CheckUlt, Restart Rule);
            Start Rule(CheckDash, Restart Rule);
            Enable Built-In Game Mode Respawning(Event Player);
            Set Player Variable(Event Player, C, False);
            Set Player Variable(Event Player, LockCollected, Empty Array);
            If((Event Player).NotOnLastCp);
                Call Subroutine(StopPauseTimer);
            End;
        Else;
            If((Event Player).NotOnLastCp);
                Call Subroutine(StartPauseTimer);
            End;
            Stop Chasing Player Variable(Event Player, practicetimer);
            Stop Chasing Player Variable(Event Player, D);
            Disable Built-In Game Mode Respawning(Event Player);
            Wait(0.2, Ignore Condition);
            Kill(Event Player, Null);
            Teleport(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)));
        End;
        Set Player Variable(Event Player, F, Not((Event Player).F));
    }
}

rule ("Toggle Invincible Mode | Melee + Rel﻿oad") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Melee)) == True;
        Is Button Held(Event Player, Button(Reload)) == True;
        Is Using Ability 1(Event Player) == False;
        Is Using Ultimate(Event Player) == False;
        Is Alive(Event Player) == True;
        Or(Not(Global.CompMode), Not((Event Player).CompDone)) == True;
    }
    actions {
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Set Player Variable(Event Player, flytoggle, Null);
        If((Event Player).C);
            Start Forcing Player Position(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)), True);
            Teleport(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)));
            Wait(0.1, Ignore Condition);
            If((Event Player).PracticeToggle);
                Big Message(Event Player, Custom String("Practice mode", Null, Null, Null));
                Chase Player Variable At Rate(Event Player, practicetimer, 9999999, 1, None);
            Else;
                Big Message(Event Player, Custom String("Normal mode", Null, Null, Null));
                Chase Player Variable At Rate(Event Player, D, 9999999, 1, None);
                Call Subroutine(StopPauseTimer);
            End;
            Stop Forcing Player Position(Event Player);
            Set Player Variable(Event Player, flytoggle, Null);
        Else;
            Abort If(Not((Event Player).NotOnLastCp));
            Call Subroutine(StartPauseTimer);
            Stop Chasing Player Variable(Event Player, D);
            Stop Chasing Player Variable(Event Player, practicetimer);
            Big Message(Event Player, Custom String("Invincible mode", Null, Null, Null));
            Set Player Variable(Event Player, flytoggle, Null);
            Wait(0.2, Ignore Condition);
        End;
        Set Player Variable(Event Player, C, Not((Event Player).C));
        Start Rule(CheckUlt, Restart Rule);
        Start Rule(CheckDash, Restart Rule);
    }
}

rule ("Toggle Practice Mode | Melee + Ultimate") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Melee)) == True;
        Is Button Held(Event Player, Button(Ultimate)) == True;
        Is Using Ability 1(Event Player) == False;
        Is Alive(Event Player) == True;
        (Event Player).EditorOn == False;
        Global.CompMode == False;
    }
    actions {
        If((Event Player).C);
            Small Message(Event Player, Custom String("   Cannot toggle practice mode while in invincible", Null, Null, Null));
            Wait(0.016, Ignore Condition);
            Abort;
        End;
        Set Player Variable(Event Player, LockState, True);
        If(Is Using Ultimate(Event Player));
            Kill(Event Player, Null);
        End;
        Wait(0.16, Ignore Condition);
        If((Event Player).PracticeToggle);
            Start Forcing Player Position(Event Player, Last Of(Value In Array(Global.A, (Event Player).PracticeCheckpoint)), True);
            Set Player Variable(Event Player, A, (Event Player).PracticeCheckpoint);
            Call Subroutine(checkpointFailReset);
            Set Player Variable(Event Player, LockCollected, Empty Array);
            Call Subroutine(UpdateCache);
            Wait(0.1, Ignore Condition);
            Stop Chasing Player Variable(Event Player, practicetimer);
            Big Message(Event Player, Custom String("Normal mode", Null, Null, Null));
            If((Event Player).NotOnLastCp);
                Set Player Variable(Event Player, splittime, (Event Player).D);
                "abs removed"
                Chase Player Variable At Rate(Event Player, D, 9999999, 1, None);
                Call Subroutine(StopPauseTimer);
            End;
            Start Rule(CheckUlt, Restart Rule);
            Start Rule(CheckDash, Restart Rule);
            Stop Forcing Player Position(Event Player);
        Else;
            Set Player Variable(Event Player, PracticeCheckpoint, (Event Player).A);
            Start Forcing Player Position(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)), True);
            Stop Chasing Player Variable(Event Player, D);
            Big Message(Event Player, Custom String("Practice mode", Null, Null, Null));
            Stop Forcing Player Position(Event Player);
            If((Event Player).NotOnLastCp);
                Call Subroutine(StartPauseTimer);
            End;
            Set Player Variable(Event Player, splittime, 0);
            Set Player Variable(Event Player, practicetimer, 0);
            Chase Player Variable At Rate(Event Player, practicetimer, 9999999, 1, None);
            Wait(0.2, Ignore Condition);
        End;
        Set Player Variable(Event Player, PracticeToggle, Not((Event Player).PracticeToggle));
        Wait(0.3, Ignore Condition);
        Set Player Variable(Event Player, LockState, False);
    }
}

rule ("Practice Restart | Interact") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Interact)) == True;
        Is Button Held(Event Player, Button(Crouch)) == False;
        Is Button Held(Event Player, Button(Ultimate)) == False;
        Is Button Held(Event Player, Button(Melee)) == False;
        Is Button Held(Event Player, Button(Ability 2)) == False;
        Or(Is Alive(Event Player), (Event Player).F) == True;
        (Event Player).EditorOn == False;
        (Event Player).PracticeToggle != False;
    }
    actions {
        "first 2 ifs prevent collide with spec"
        If((Event Player).F);
            Wait Until(Is Alive(Event Player), 9999);
            Wait Until(Not(Is Button Held(Event Player, Button(Interact))), 2);
            Abort;
        End;
        Wait Until(Not(Is Button Held(Event Player, Button(Interact))), 0.9);
        Abort If(Is Button Held(Event Player, Button(Interact)));
        If(Is Using Ultimate(Event Player));
            Kill(Event Player, Null);
        End;
        Set Player Variable(Event Player, practicetimer, 0);
        Set Player Variable(Event Player, splittime, 0);
        Teleport(Event Player, Value In Array(Global.A, (Event Player).PracticeCheckpoint));
        Set Player Variable(Event Player, A, (Event Player).PracticeCheckpoint);
        Set Status(Event Player, Null, Rooted, 0.2);
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Call Subroutine(UpdateCache);
    }
}

rule ("Skip | Crouch + Primary/Secondary Fire") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Crouch)) == True;
        Or(Is Button Held(Event Player, Button(Primary Fire)), Is Button Held(Event Player, Button(Secondary Fire))) == True;
        (Event Player).LockState == False;
        Or((Host Player).EditorOn, (Event Player).PracticeToggle) == True;
    }
    actions {
        Set Player Variable(Event Player, splittime, 0);
        Set Player Variable(Event Player, practicetimer, 0);
        If(Is Button Held(Event Player, Button(Secondary Fire)));
            Set Player Variable(Event Player, LockState, True);
            If(Compare((Event Player).A, <, 1));
                Set Player Variable(Event Player, A, Subtract(Count Of(Global.A), 1));
            Else If(And(Compare(Count Of(Value In Array(Global.A, Subtract((Event Player).A, 1))), >, 1), Compare(Distance Between(First Of(Value In Array(Global.A, (Event Player).A)), Value In Array(Value In Array(Global.A, Subtract((Event Player).A, 1)), 1)), <, 1.4)));
                Modify Player Variable(Event Player, A, Subtract, 2);
            Else;
                Modify Player Variable(Event Player, A, Subtract, 1);
            End;
        Else;
            Set Player Variable(Event Player, LockState, True);
            If(Compare((Event Player).A, >=, Subtract(Count Of(Global.A), 1)));
                Set Player Variable(Event Player, A, 0);
            Else;
                Modify Player Variable(Event Player, A, Add, 1);
            End;
        End;
        Wait(0.016, Ignore Condition);
        Call Subroutine(checkpointFailReset);
        Wait(0.064, Ignore Condition);
        Set Player Variable(Event Player, LockState, False);
        Set Player Variable(Event Player, MovedCheckpoint, True);
        Call Subroutine(UpdateCache);
        "faster if you spam button"
        Wait Until(And(Not(Is Button Held(Event Player, Button(Primary Fire))), Not(Is Button Held(Event Player, Button(Secondary Fire)))), 0.28);
        Loop If Condition Is True;
    }
}

rule ("Quick Reset | Rel﻿oad, Hold Rel﻿oad to Enable") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Reload)) == True;
        Is Button Held(Event Player, Button(Melee)) == False;
    }
    actions {
        If((Event Player).quick_restart);
            Set Player Variable(Event Player, LockCollected, Empty Array);
            If(Is Using Ultimate(Event Player));
                Kill(Event Player, Null);
            End;
            Start Forcing Player Position(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)), True);
            Set Player Variable(Event Player, flytoggle, Null);
            Start Rule(CheckUlt, Restart Rule);
            Start Rule(CheckDash, Restart Rule);
            Teleport(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)));
            Wait(0.1, Ignore Condition);
            Stop Forcing Player Position(Event Player);
            Set Player Variable(Event Player, flytoggle, Null);
            Wait(0.24, Ignore Condition);
        End;
        Wait(1, Abort When False);
        Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
        Set Player Variable(Event Player, quick_restart, Not((Event Player).quick_restart));
        Big Message(Event Player, If-Then-Else((Event Player).quick_restart, Custom String("Quick reset is enabled", Null, Null, Null), Custom String("Quick reset is disabled", Null, Null, Null)));
    }
}

disabled rule ("------------------------------------------------------------------------ Checks ------------------------------------------------------------------------ ") {
    event {
        Ongoing - Global;
    }
}

rule ("Checking | ult combined rule") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Using Ultimate(Event Player) == True;
    }
    actions {
        Wait(1.8, Abort When False);
        If(And((Event Player).NotOnLastCp, Not((Event Player).C)));
            "disable primary fire because of slash exploit"
            Disallow Button(Event Player, Button(Primary Fire));
        End;
        Wait Until(Not(Is Using Ultimate(Event Player)), 2);
        Wait(0.016, Ignore Condition);
        Allow Button(Event Player, Button(Primary Fire));
        "sets ult charge back if done with map etc"
        Start Rule(CheckUlt, Restart Rule);
    }
}

rule ("Checking | Dash combined rule") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Using Ability 1(Event Player) == True;
    }
    actions {
        Start Rule(CheckDash, Restart Rule);
    }
}

rule ("Subroutine CheckUlt") {
    event {
        Subroutine;
        CheckUlt;
    }
    actions {
        Wait Until(Not(Is Using Ultimate(Event Player)), 2);
        If(Or((Event Player).C, Not((Event Player).NotOnLastCp)));
            "skip msg if these"
            Skip(2);
        Else If(And(Array Contains(Global.Dao, (Event Player).A), Compare(Distance Between(Event Player, Last Of(Value In Array(Global.A, (Event Player).A))), <=, 1.4)));
            Small Message(Event Player, Custom String("   Ultimate is ready", Null, Null, Null));
            Wait(0.016, Ignore Condition);
            Set Ultimate Ability Enabled(Event Player, True);
            Set Ultimate Charge(Event Player, 100);
        Else If((Event Player).EditorOn);
            Wait(0.016, Ignore Condition);
            Set Ultimate Ability Enabled(Event Player, True);
            Set Ultimate Charge(Event Player, 100);
        "used to be just else, but have to deal with multi ult orbs"
        Else If(Compare(Distance Between(Event Player, Last Of(Value In Array(Global.A, (Event Player).A))), <=, 2));
            Set Ultimate Ability Enabled(Event Player, False);
            Set Ultimate Charge(Event Player, 0);
        End;
    }
}

rule ("Subroutine CheckDash") {
    event {
        Subroutine;
        CheckDash;
    }
    actions {
        Wait Until(Not(Is Using Ability 1(Event Player)), 2);
        If(Or((Event Player).C, Not((Event Player).NotOnLastCp)));
            "skip msg if these"
            Skip(2);
        Else If(And(Array Contains(Global.SHIFT, (Event Player).A), Compare(Distance Between(Event Player, Last Of(Value In Array(Global.A, (Event Player).A))), <=, 1.4)));
            Small Message(Event Player, Custom String("   Dash is ready", Null, Null, Null));
            Wait(0.016, Ignore Condition);
            Set Ability 1 Enabled(Event Player, True);
        "seeprate so msg stil plays"
        Else If((Event Player).EditorOn);
            Set Ability 1 Enabled(Event Player, True);
        Else;
            Set Ability 1 Enabled(Event Player, False);
        End;
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
        "?????? why wasnt this as fales"
        Is Button Held(Event Player, Button(Jump)) == False;
    }
    actions {
        Set Player Variable(Event Player, O, False);
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
        "actualy just checks if you been in the air for atleast 0.1 seconds"
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
        Set Player Variable(Event Player, J, True);
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
        Set Player Variable(Event Player, O, False);
    }
}

rule ("Checking | Bhop") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).O == False;
        Is Jumping(Event Player) == True;
    }
    actions {
        Set Player Variable(Event Player, O, True);
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
        Is Button Held(Event Player, Button(Crouch)) == True;
        Is Crouching(Event Player) == True;
        Is In Air(Event Player) == True;
        Is On Wall(Event Player) == False;
        Is Button Held(Event Player, Button(Jump)) == False;
        Is Jumping(Event Player) == False;
        Is On Ground(Event Player) == False;
    }
    actions {
        Set Player Variable(Event Player, O, False);
        If(And(And(Compare(Global.kaxiaotiao, ==, True), Compare((Event Player).C, ==, False)), Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1))));
            Small Message(Event Player, Custom String("   Create Bhop ♂ is banned!", Null, Null, Null));
            Call Subroutine(checkpointFailReset);
            Abort;
        End;
        Small Message(Event Player, Custom String("   Bhop has been created!", Null, Null, Null));
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
        Set Player Variable(Event Player, TY, 0);
        Set Player Variable(Event Player, J, False);
        Set Player Variable(Event Player, climbNum, 0);
        Wait(0, Ignore Condition);
        Loop If(And(Or(Compare((Event Player).TY, !=, 0), (Event Player).J), Is On Ground(Event Player)));
        Set Player Variable(Event Player, O, True);
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
        (Event Player).J == False;
    }
    actions {
        Modify Player Variable(Event Player, climbNum, Add, 1);
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
        (Event Player).ban_climb != False;
        (Event Player).C == False;
        (Event Player).NotOnLastCp != False;
        (Event Player).J != False;
    }
    actions {
        Call Subroutine(checkpointFailReset);
        Small Message(Event Player, Custom String("   Climb ↑ is banned!", Null, Null, Null));
    }
}

rule ("Ban | Triple Jump") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).ban_triple != False;
        (Event Player).C == False;
        (Event Player).NotOnLastCp != False;
        Vertical Speed Of(Event Player) >= 5.8;
        (Event Player).TY == 1;
        Is Using Ability 1(Event Player) == False;
        Is On Wall(Event Player) == False;
    }
    actions {
        Small Message(Event Player, Custom String("   Triple Jump ▲ is banned!", Null, Null, Null));
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
        (Event Player).ban_multi != False;
        (Event Player).C == False;
        (Event Player).NotOnLastCp != False;
        (Event Player).climbNum > 0;
    }
    actions {
        Small Message(Event Player, Custom String("   Multiclimb ∞ is banned!", Null, Null, Null));
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
        (Event Player).ban_emote != False;
        (Event Player).C == False;
        (Event Player).NotOnLastCp != False;
        Is Communicating Any Emote(Event Player) == True;
    }
    actions {
        Small Message(Event Player, Custom String("   Emote Savehop ♥ is banned!", Null, Null, Null));
        Call Subroutine(checkpointFailReset);
    }
}

disabled rule ("------------------------------------------------------------------------ Addons  ------------------------------------------------------------------------") {
    event {
        Ongoing - Global;
    }
}

${ulteanbled}rule ("Addon | Add Blade to Checkpoint <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        "Change \"-1\" to certain Checkpoints' number. For example if you want to add Blade to Checkpoint 2 and 6 change one of \"-1\" to 2 and other \"-1\" to 6"
        Wait(1, Ignore Condition);
        ${ultarray}
    }
}

${dasheanbled}rule ("Addon | Add Dash to Checkpoint <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        "Change \"-1\" to certain Checkpoints' number. For example if you want to add Dash to Checkpoint 7 and 1 change one of \"-1\" to 7 and other \"-1\" to 1"
        Wait(1, Ignore Condition);
        ${dasharray}
    }
}

${titleon}rule ("Addon | Title Data <---- EDIT ME") {
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

${hudeanbled}rule ("Addon | HUD text for certain Checkpoints <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        Wait(0.5, Ignore Condition);
        "in CpHudText fill in text\r\n in CpHudCp fill in the at wich to display\r\n the example fill shows a text for cp 1 and cp 3"
        ${hudtext}
        ${hudcps}
    }
}

  ${iwtenabled}rule ("Addon | In world text for certain Checkpoints <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        Wait(0.5, Ignore Condition);
        "in CpIwtText fill in text\r\n in CpIwtCp fill in cp at wich to display\r\n in CpIwtPos fill in the vector\r\n the example fill shows a text for cp 1 and cp 3"
        ${iwttext}
        ${iwtcps}
        ${iwtpos}
        "color is for all, not per cp"
        ${iwtcolor}
    }
}
rule ("Addon | pre-set control map portal | placement | toggled via workshop") {
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

rule ("Addon | pre-set control map portal | function | toggled via workshop") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Global.PortalOn != False;
        Or((Event Player).C, Not((Event Player).NotOnLastCp)) == True;
        Count Of(Global.PortalLoc) != Null;
        Is True For Any(Global.PortalLoc, Compare(Distance Between(Add(Position Of(Event Player), Vector(0, 0.2, 0)), Current Array Element), <, 1.4)) == True;
    }
    actions {
        If(Compare(Value In Array(Global.PortalDest, Index Of Array Value(Global.PortalLoc, First Of(Sorted Array(Global.PortalLoc, Distance Between(Event Player, Current Array Element))))), !=, Vector(0, 0, 0)));
            Teleport(Event Player, Value In Array(Global.PortalDest, Index Of Array Value(Global.PortalLoc, First Of(Sorted Array(Global.PortalLoc, Distance Between(Event Player, Current Array Element))))));
    }
}

disabled rule ("Addon | custom portals | data <---- EDIT ME") {
    event {
        Ongoing - Global;
    }
    actions {
        "warning: This can cause you to exceed global orb/portal limit. \r\nmake sure portal + orbs do not go past the limit."
        Wait(1, Ignore Condition);
        "Portal start position"
        Set Global Variable(CustomPortalStart, Array(Vector(0, 0, 0)));
        "Portal end position (on same number as start position)"
        Set Global Variable(CustomPortalEndpoint, Array(Vector(0, 10, 0)));
        "Portal checkpoint (on same number as start position) \r\n999 = apply portal to entire map"
        Set Global Variable(CustomPortalCP, Array(999));
    }
}

disabled rule ("Addon | custom portals | function") {
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

rule ("Ms. Destructo | Destroys Breakable Objects On All Maps") {
    event {
        Ongoing - Global;
    }
    conditions {
        "Credit: nebula#11571"
        Is Game In Progress == True;
    }
    actions {
        Wait Until(Is True For Any(All Players(All Teams), Has Spawned(Current Array Element)), 99999);
        "Init dummy at arbitrary location\r\n previously -1 slot, now extra dummy enabled to spawn outside of player slot to prevent overwrite of slot"
        Create Dummy Bot(Hero(D.Va), Team Of(First Of(Filtered Array(All Players(All Teams), And(Has Spawned(Current Array Element), Not(Is Dummy Bot(Current Array Element)))))), 20, Vector(0, 200, 0), Vector(0, 0, 0));
        Set Global Variable(MsDestructo, Last Created Entity);
        "MsDestructo.startForcingName(\"Ms. Destructo\") #disabled because translated this line gives errors"
        Wait(1, Ignore Condition);
        "MsDestructo.setInvisibility(Invis.ALL)"
        Set Player Variable(Global.MsDestructo, MapVectorArray, Array(Array(0, Map(Hanamura), Map(Horizon Lunar Colony), Map(Paris), Map(Temple of Anubis), Map(Dorado), Map(Havana), Map(Junkertown), Map(Rialto), Map(Route 66), Map(Watchpoint: Gibraltar), Map(Blizzard World), Map(Eichenwalde), Map(Hollywood), Map(King's Row), Map(Numbani), Map(Ayutthaya), Map(Black Forest), Map(Castillo), Map(Ecopoint: Antarctica), Map(Château Guillard), Map(Kanezaka), Map(Necropolis), Map(Petra), Map(Volskaya Industries), Map(Practice Range), Map(Ilios), Map(Busan), Map(Lijiang Tower), Map(Nepal), Map(Oasis), Map(Malevento), Map(Circuit Royal), Map(Esperança), Map(New Queen Street), Map(Paraíso), Map(Colosseo), Map(Midtown)), Array(Vector(15.759, 30.576, -27.201)), Array(Vector(31.759, 40.003, -59.476)), Array(Vector(-54.508, 40.179, -10.866)), Array(Vector(-26.78, 23.366, 40.284)), Array(Vector(69.418, 42.103, -17.712)), Array(Vector(9.382, 38.635, -81.276)), Array(Vector(9.382, 38.635, -81.276)), Array(Vector(9.756, 30.753, -41.395)), Array(Vector(30.313, 28.237, -16.925)), Array(Vector(73.985, 26.198, -109.338)), Array(Vector(-21.03, 35.127, 88.381)), Array(Vector(54.798, 40.964, -82.78)), Array(Vector(-0.355, 28.167, -22.396)), Array(Vector(-56.869, 24.061, -32.132)), Array(Vector(105.299, 22.764, 14.89)), Array(Vector(16.965, 26.541, -7.13)), Array(Vector(-9.622, 44.751, 5.635)), Array(Vector(-100.828, 76.566, 60.021)), Array(Vector(-6.186, 35.564, 1.378)), Array(Vector(200.414, 82.412, 78.813)), Array(Vector(-36.319, 32.305, 0.472)), Array(Vector(-1.144, 47.168, -2.946)), Array(Vector(9.678, 28.313, 13.4)), Array(Vector(-49.147, 22.344, 76.844)), Array(Vector(54.948, 50.769, 3.93)), Array(Vector(322.988, 40, -37.732), Vector(27.711, 100, -161.298), Vector(-223.895, 50, 0.89)), Array(Vector(51.885, 37.172, -113.654), Vector(-329.934, 56.136, 149.839), Vector(227.21, 43.353, 252.64)), Array(Vector(-5.808, 324.398, 282.523), Vector(-0.414, 156.197, 148.681), Vector(-0.381, 53.736, -33.335)), Array(Vector(83.1, 178.926, 0.593), Vector(-49.803, 63.29, -0.413), Vector(-184.659, -38.73, -0.783)), Array(Vector(150.125, 30.619, 251.966), Vector(134.888, 36.76, -240.736), Vector(-195.549, 60.35, -0.098)), Array(Vector(17.808, 35.955, 17.505)), Array(Vector(13, 61, -37)), Array(Vector(0, 50, 0)), Array(Vector(0, 35, 25), Vector(0, 8, 23.77)), Array(Vector(-29, 40, -36.9)), Array(Vector(0, 40, 0)), Array(Vector(49.3, 45, -2.83))));
        For Player Variable(Global.MsDestructo, ArrayIterator, 0, Count Of(Value In Array((Global.MsDestructo).MapVectorArray, Index Of Array Value(First Of((Global.MsDestructo).MapVectorArray), Current Map))), 1);
            Start Forcing Player Position(Global.MsDestructo, Value In Array(Value In Array((Global.MsDestructo).MapVectorArray, Index Of Array Value((Global.MsDestructo).MapVectorArray, Current Map)), (Global.MsDestructo).ArrayIterator), True);
            Start Scaling Player(Global.MsDestructo, 20, True);
            Disable Movement Collision With Environment(Global.MsDestructo, True);
            Set Ultimate Ability Enabled(Global.MsDestructo, True);
            Set Ultimate Charge(Global.MsDestructo, 100);
            Wait(3, Ignore Condition);
            Start Holding Button(Global.MsDestructo, Button(Ultimate));
            Wait(5, Ignore Condition);
            Respawn(Global.MsDestructo);
            Wait(3, Ignore Condition);
        End;
        Destroy Dummy Bot(Team Of(Global.MsDestructo), Slot Of(Global.MsDestructo));
        "Remove MsDestructo data when done"
        Set Player Variable(Global.MsDestructo, MapVectorArray, 0);
        Set Player Variable(Global.MsDestructo, ArrayIterator, 0);
        Set Global Variable(MsDestructo, 0);
    }
}

`
}