
document.getElementById("versiondisplayhere").innerHTML = "1.8.2b"



function setdata(){ //String.raw
    data_pasta = String.raw`
settings
{
	main
	{
		Description: "  ~ The Official Genji Parkour Editor ~\nCode: 54CRY\nAdapted by: nebula#11571/FishoFire#2431"
		Mode Name: "Genji Parkour - 源氏跑酷 - v1.8.2b"
	}
	lobby
	{
		Allow Players Who Are In Queue: Yes
		Match Voice Chat: Enabled
		Max Spectators: 3
		Max Team 1 Players: ${team1players}
		Max Team 2 Players: ${team2players}
		Return To Lobby: Never
		Swap Teams After Match: No
	}
	modes
	{
		Skirmish
		{
			enabled maps
			{
				Workshop Chamber
			}
		}
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
				Ultimate Generation - Passive Dragonblade: 0%
				Ultimate Generation Dragonblade: 10%
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
        70: Name
        71: Code
        73: Cachedcredits
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
        90: DestructoIter
        91: MapVectorArray
    player:
        0: A
        2: C
        3: D
        4: E
        5: F
        6: LedgeDash
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
        29: CreateCounter
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
        59: bouncetouchedlast
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
        78: ban_bhop
        79: splittime
        80: splitdisplay
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
rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
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

rule("SUB | Update Effect Cache")
{
	event
	{
		Subroutine;
		UpdateCache;
	}

	actions
	{
		Event Player.NotOnLastCp = Event Player.A < Count Of(Global.A) - 1 && Count Of(Global.A) > 1;
		Event Player.BouncePosition_Cache = Filtered Array(Global.TQ, Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.BounceStrength_Cache = Filtered Array(Global.EditMode, Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.BounceUlt_Cache = Filtered Array(Global.TQ5, Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.BounceDash_Cache = Filtered Array(Global.TQ6, Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.BounceLock_Cache = Filtered Array(Global.BounceToggleLock,
			Global.pinballnumber[Current Array Index] == Event Player.A);
		Event Player.KillPosition_Cache = Filtered Array(Global.H, Global.killballnumber[Current Array Index] == Event Player.A);
		Event Player.KillRadii_Cache = Filtered Array(Global.I, Global.killballnumber[Current Array Index] == Event Player.A);
		Event Player.BounceLockMax_Cache = Count Of(Filtered Array(Event Player.BounceLock_Cache, Current Array Element));
		Event Player.banstring = Custom String("");
		Wait(0.016, Ignore Condition);
		If(Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String("ban Triple Jump - 三段跳"),
			${ban_triple}, 0));
			Event Player.ban_triple = True;
		Else If(Array Contains(Global.BanTriple, Event Player.A));
			Event Player.banstring = Custom String("▲ {0}", Event Player.banstring);
			Event Player.ban_triple = True;
		Else;
			Event Player.ban_triple = False;
		End;
		If(Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String("ban Multiclim - 封禁蹭留"), ${ban_multi},
			1));
			Event Player.ban_multi = True;
		Else If(Array Contains(Global.BanMulti, Event Player.A));
			Event Player.banstring = Custom String("∞ {0}", Event Player.banstring);
			Event Player.ban_multi = True;
		Else;
			Event Player.ban_multi = False;
		End;
		If(Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String("ban Createbhop - 封禁卡小"),
			${ban_create}, 2));
			Event Player.ban_create = True;
		Else If(Array Contains(Global.BanCreate, Event Player.A));
			Event Player.banstring = Custom String("♂ {0}", Event Player.banstring);
			Event Player.ban_create = True;
		Else;
			Event Player.ban_create = False;
		End;
		If(Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String("ban Deathbhop - 封禁死小"), ${ban_dbhop},
			3));
			Event Player.ban_dedhop = True;
		Else If(Array Contains(Global.BanDead, Event Player.A));
			Event Player.banstring = Custom String("X {0}", Event Player.banstring);
			Event Player.ban_dedhop = True;
		Else;
			Event Player.ban_dedhop = False;
		End;
		If(Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String("ban Emote Savehop - 封禁表情爬"),
			${ban_emote}, 4));
			Event Player.ban_emote = True;
		Else If(Array Contains(Global.BanEmote, Event Player.A));
			Event Player.banstring = Custom String("♥ {0}", Event Player.banstring);
			Event Player.ban_emote = True;
		Else;
			Event Player.ban_emote = False;
		End;
		If(Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String("ban Wallclimb - 封禁爬墙"), ${ban_climb},
			5));
			Event Player.ban_climb = True;
		Else If(Array Contains(Global.BanClimb, Event Player.A));
			Event Player.banstring = Custom String("↑ {0}", Event Player.banstring);
			Event Player.ban_climb = True;
		Else;
			Event Player.ban_climb = False;
		End;
		If(Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
			"require bhop available - 留小跳进点 "), ${ban_requirebhop}, 5));
			Event Player.ban_bhop = True;
		Else If(Array Contains(Global.BanBhop, Event Player.A));
			"≥  √ ▼ ↓"
			Event Player.banstring = Custom String("≥ {0}", Event Player.banstring);
			Event Player.ban_bhop = True;
		Else;
			Event Player.ban_bhop = False;
		End;
		Wait(0.016, Ignore Condition);
		Start Rule(CheckUlt, Restart Rule);
		Start Rule(CheckDash, Restart Rule);
		Abort If(!Event Player.EditorOn);
		Destroy Effect(Event Player.EffectSizeArray);
		Event Player.EffectSizeArray = Empty Array;
		Create Effect(Event Player.EffectSizeToggle ? Event Player : Null, Sphere, Color(White), Global.A[Event Player.A], 1.400,
			Visible To Position and Radius);
		Modify Player Variable(Event Player, EffectSizeArray, Append To Array, Last Created Entity);
		Create Effect(Event Player.EffectSizeToggle && Event Player.NotOnLastCp ? Event Player : Null, Sphere, Color(White),
			Global.A[Event Player.A + 1], 1.400, Visible To Position and Radius);
		Modify Player Variable(Event Player, EffectSizeArray, Append To Array, Last Created Entity);
		Event Player.BounceIndex_Cache = Filtered Array(Mapped Array(Global.pinballnumber,
			Current Array Element == Event Player.A ? Current Array Index : -1), Current Array Element >= 0);
		Event Player.KillIndex_Cache = Filtered Array(Mapped Array(Global.killballnumber,
			Current Array Element == Event Player.A ? Current Array Index : -1), Current Array Element >= 0);
		If(Event Player.MovedCheckpoint && Event Player == Host Player);
			"SelectedCheckpoint_Editing = eventPlayer.CurrentCheckpoint"
			Global.J = Event Player.KillIndex_Cache ? 0 : 99999;
			Global.L = Count Of(Event Player.KillIndex_Cache) ? Global.H[Event Player.KillIndex_Cache[Global.J]] : Vector(0, 0, 0);
			Global.TQ1 = Event Player.BounceIndex_Cache ? 0 : 99999;
			Global.TQ3 = Count Of(Event Player.BounceIndex_Cache) ? Global.TQ[Event Player.BounceIndex_Cache[Global.TQ1]] : Vector(0, 0, 0);
			Event Player.MovedCheckpoint = False;
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
        Wait(1, Abort When False);
        "hostPlayer.CurrentCheckpoint = 0\r\nUpdateCache()\r\nwait()"
        Set Global Variable(C, 0);
        Set Global Variable(J, 0);
        Set Global Variable(K, 0);
        Set Global Variable(L, 0);
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
        Set Global Variable(LeaderBoardHuds, Empty Array);
        Set Global Variable(PortalOn, False);
        Set Global Variable(TitleData, Null);
        Set Global Variable(CpHudText, Null);
        Set Global Variable(CpHudCp, Null);
        Set Global Variable(CpIwtText, Null);
        Set Global Variable(CpIwtCp, Null);
        Set Global Variable(CpIwtPos, Null);
        Set Global Variable(CpIwtColor, Null);
        Set Global Variable(PortalNames, Empty Array);
        Set Global Variable(PortalLoc, Empty Array);
        Set Global Variable(PortalDest, Empty Array);
        Set Global Variable(CustomPortalStart, Empty Array);
        Set Global Variable(CustomPortalEndpoint, Empty Array);
        Set Global Variable(CustomPortalCP, Empty Array);
        Set Global Variable(BanTriple, Empty Array);
        Set Global Variable(BanMulti, Empty Array);
        Set Global Variable(BanCreate, Empty Array);
        Set Global Variable(BanDead, Empty Array);
        Set Global Variable(BanEmote, Empty Array);
        Set Global Variable(BanClimb, Empty Array);
        Set Global Variable(BanBhop, Empty Array);
        Enable Inspector Recording;
        Create HUD Text(Event Player, Custom String(" ", Null, Null, Null), Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n 0. 清理多余数据:\n打开此窗口时自动完成\n\n1. 复制数据:\n打开工作坊检查→将可变目标设置为全局\n\n按[x]\n2. 插入数据:\n将数据粘贴到名为'map data{0}", Custom String("'的规则中(第2页)\n\n3.车间设置:\nESC→展示大厅→设置→工作坊设置→\n关闭'编辑模式'\n选择显示难度\n", Null, Null, Null), Null, Null), Custom String("　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   0. clear excess data:\n Automatically done when opening this window\n\n   1. Copy da{0}", Custom String("ta:\n Open Workshop Inspector → Set variable target as global\n click the [x]\n\n   2. Insert data:\n Paste the data in the rul{0}", Custom String("e named 'map data pasta' (first rule)\n\n   3. Workshop settings:\n ESC→SHOW LOBBY→SETTINGS→ workshop settings →\n toggle 'Edi{0}", Custom String("tor mode' off\n Select display difficulty\n", Null, Null, Null), Null, Null), Null, Null), Null, Null)), Top, -186, Color(Lime Green), Color(Lime Green), Color(Lime Green), String, Default Visibility);
        Set Player Variable At Index(Event Player, savemaphud, 0, Last Text ID);
        Create HUD Text(Event Player, Custom String(" ", Null, Null, Null), Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n4. 创建初始共享代码:\nEsc→显示大厅→设置→共享代码→\n创建新代码→复制代码\n\n5. 添加参与者:\n在'Credits here'规则中输入您的姓名和地图代码\n\n{0}", Custom String("(第二页)\n6. 参与者更新:\nEsc→显示大厅→设置→共享代码→\n上传到现有代码→粘贴在步骤4中创建的代码\n", Null, Null, Null), Null, Null), Custom String("　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   4. Create initial sharecode:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n CREATE NEW COD{0}", Custom String("E→COPY CODE\n\n   5. Add credits:\n Enter your name & map code in the 'Credits here' rule\n (second rule) \n\n   6. Update for c{0}", Custom String("redits:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n UPLOAD TO EXISTING CODE→ PASTE THE CODE YOU CREATED IN STEP 4\n", Null, Null, Null), Null, Null), Null, Null)), Top, -185, Color(Lime Green), Color(Lime Green), Color(Lime Green), String, Default Visibility);
        Set Player Variable At Index(Event Player, savemaphud, 1, Last Text ID);
        Create HUD Text(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("    > 按互动键关闭当前窗口 <    ", Null, Null, Null), Custom String("    > Press Interact to close this window <    ", Null, Null, Null)), Null, Null, Top, -184, Color(Lime Green), Null, Null, String, Default Visibility);
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
            Set Global Variable(K, Null);
            Set Global Variable(TQ2, Null);
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
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), Null, Null, Custom String("{0}", If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Value In Array(Array(Custom String("{0} + {1} | 新建检查点\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | 删除选中的检查点\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | 移除/新建传送点\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Reload)), Custom String("{0} + {1} | 移动检查点至当前位置\n{0} + {2} | 检查点碰撞模型\n{1} (长按) | 微调检查点位置", Input Binding String(Button(Interact)), Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 1)))))), Custom String("{0} + {1} | 新建击杀球\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | 删除选中的击杀球\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | 选择上一个击杀球\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | 选择下一个击杀球\n\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | 增大击杀球尺寸\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | 减小击杀球尺寸\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | 向前移动击杀球\n{0} + {2} | 向后移动击杀球", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire))))))))), Custom String("{0} + {1} | 新建弹球\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | 选择上一个弹球\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | 选择下一个弹球\n\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | 删除选中的弹球\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | 增加弹球弹力\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | 减少弹球弹力\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | 向前移动弹球\n{0} + {2} | 向后移动弹球", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire)))))))))), (Host Player).E), Value In Array(Array(Custom String("{0} + {1} | Create New Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Delete selected Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Remove/Add teleport\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Reload)), Custom String("{0} + {1} | Set Checkpoint to current position\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Ultimate)), Custom String("{0} + {1} | Toggle Checkpoint Hitbox\n{2} (hold) | Precise position changing", Input Binding String(Button(Interact)), Input Binding String(Button(Ability 1)), Input Binding String(Button(Melee))))))), Custom String("{0} + {1} | Create new kill orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Select next orb\n\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Increase orb size\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb size\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Move orb forward\n{0} + {2} | Move orb Backward", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire))))))))), Custom String("{0} + {1} | Create new Bounce orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Select next orb\n\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Increase orb strength\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb strength\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Move orb forward\n{0} + {2} | Move orb back", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)), Input Binding String(Button(Secondary Fire)))))))))), (Host Player).E)), Null, Null), Right, -148, Null, Null, Color(Yellow), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String(" \n{0} + {1} | 下一个检查点\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | 上一个检查点\n{2} | 飞行 (仅限检查点模式)\n", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Ability 2)))), Custom String(" \n{0} + {1} | Next checkpoint\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Prev checkpoint\n{2} | Fly (checkpoint mode only)\n", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Ability 2))))), Right, -149, Null, Null, If-Then-Else((Host Player).K, Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("保存地图长按 {0} + {1} + {2} 后按弹出窗口的提示进行操作", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)), Input Binding String(Button(Reload))), Custom String("to save map hold {0} + {1} + {2} and follow instructions", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)), Input Binding String(Button(Reload)))), Null, Left, -197, Null, Color(Yellow), Null, Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else(Compare(Local Player, ==, Host Player), Custom String(" {0} {1} ", Value In Array(Array(Icon String(Flag), Icon String(Skull), Icon String(Moon)), (Host Player).E), Value In Array(Array(Custom String("检查点模式", Null, Null, Null), Custom String("击杀球模式", Null, Null, Null), Custom String("弹球模式", Null, Null, Null)), (Host Player).E), Null), Custom String(" {0} 源氏 编辑者 {0} \n 房主/编辑者: {1} ", Icon String(Bolt), Host Player, Null)), If-Then-Else(Compare(Local Player, ==, Host Player), Custom String(" {0} {1} ", Value In Array(Array(Icon String(Flag), Icon String(Skull), Icon String(Moon)), (Host Player).E), Value In Array(Array(Custom String("Checkpoints mode", Null, Null, Null), Custom String("Kill Orb mode", Null, Null, Null), Custom String("Bounce Orb mode", Null, Null, Null)), (Host Player).E), Null), Custom String(" {0} Genji editor {0} \n host/editor: {1} ", Icon String(Bolt), Host Player, Null))), Null, Null, Top, -175, Color(Blue), Color(Blue), Color(Blue), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("长按 {0} 切换作图模式", Input Binding String(Button(Ability 1)), Null, Null), Custom String("Hold {0} to change mode", Input Binding String(Button(Ability 1)), Null, Null)), Null, Top, -176, Color(Sky Blue), Color(Sky Blue), Color(Sky Blue), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else(And((Host Player).K, Or(Compare((Host Player).E, ==, 0), And(Compare((Host Player).E, ==, 2), Compare(Count Of((Host Player).BounceIndex_Cache), >, 0)))), Host Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0} + {1} | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Primary Fire)), Custom String("{0} {1} | {2}", If-Then-Else(Compare((Host Player).E, ==, 0), Custom String("检查点给刀", Null, Null, Null), Custom String("弹球给刀", Null, Null, Null)), Ability Icon String(Hero(Genji), Button(Ultimate)), If-Then-Else(Compare((Host Player).E, ==, 2), If-Then-Else(Compare(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("启用", Null, Null, Null), Custom String("关闭", Null, Null, Null)), If-Then-Else(Array Contains(Global.Dao, (Host Player).A), Custom String("启用", Null, Null, Null), Custom String("关闭", Null, Null, Null))))), Custom String("{0} + {1} | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Primary Fire)), Custom String("{0} give ult {1} | {2}", If-Then-Else(Compare((Host Player).E, ==, 0), Custom String("Level", Null, Null, Null), Custom String("Orb", Null, Null, Null)), Ability Icon String(Hero(Genji), Button(Ultimate)), If-Then-Else(Compare((Host Player).E, ==, 2), If-Then-Else(Compare(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)), If-Then-Else(Array Contains(Global.Dao, (Host Player).A), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)))))), Left, -190, Null, Null, If-Then-Else(And(Compare(Value In Array(Global.TQ5, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Compare((Host Player).E, ==, 2)), Color(Green), If-Then-Else(And(Array Contains(Global.Dao, (Host Player).A), Compare((Host Player).E, ==, 0)), Color(Green), Color(Orange))), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else(And((Host Player).K, Or(Compare((Host Player).E, ==, 0), And(Compare((Host Player).E, ==, 2), Compare(Count Of((Host Player).BounceIndex_Cache), >, 0)))), Host Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0} + {1} | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Secondary Fire)), Custom String("{0} {1} | {2}", If-Then-Else(Compare((Host Player).E, ==, 0), Custom String("检查点给Shift", Null, Null, Null), Custom String("弹球给Shift", Null, Null, Null)), Ability Icon String(Hero(Genji), Button(Ability 1)), If-Then-Else(Compare((Host Player).E, ==, 2), If-Then-Else(Compare(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("启用", Null, Null, Null), Custom String("关闭", Null, Null, Null)), If-Then-Else(Array Contains(Global.SHIFT, (Host Player).A), Custom String("启用", Null, Null, Null), Custom String("关闭", Null, Null, Null))))), Custom String("{0} + {1} | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Secondary Fire)), Custom String("{0} give dash {1} | {2}", If-Then-Else(Compare((Host Player).E, ==, 0), Custom String("Level", Null, Null, Null), Custom String("Orb", Null, Null, Null)), Ability Icon String(Hero(Genji), Button(Ability 1)), If-Then-Else(Compare((Host Player).E, ==, 2), If-Then-Else(Compare(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)), If-Then-Else(Array Contains(Global.SHIFT, (Host Player).A), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)))))), Left, -189, Null, Null, If-Then-Else(And(Compare(Value In Array(Global.TQ6, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Compare((Host Player).E, ==, 2)), Color(Green), If-Then-Else(And(Array Contains(Global.SHIFT, (Host Player).A), Compare((Host Player).E, ==, 0)), Color(Green), Color(Orange))), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else(And(And(Compare((Host Player).E, ==, 2), (Host Player).K), Compare(Count Of((Host Player).BounceIndex_Cache), >, 0)), Host Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0} + {1} |  黄弹球(进点前必须收集) {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 2)), Custom String("{0} | {1}\n", Icon String(Asterisk), If-Then-Else(Compare(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("启用", Null, Null, Null), Custom String("关闭", Null, Null, Null)), Null)), Custom String("{0} + {1} | unlocks checkpoint {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 2)), Custom String("{0} | {1}\n", Icon String(Asterisk), If-Then-Else(Compare(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)), Null))), Left, -188, Null, Null, If-Then-Else(Compare(Value In Array(Global.BounceToggleLock, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), !=, 0), Color(Green), Color(Orange)), Visible To String and Color, Default Visibility);
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("球体/传送门上限: {0}/{1} ", Add(Add(Count Of(Global.TQ), Count Of(Global.H)), Count Of(Global.CustomPortalStart)), 193, Null), Custom String("orb/portal limit: {0}/{1} ", Add(Add(Count Of(Global.TQ), Count Of(Global.H)), Count Of(Global.CustomPortalStart)), 193, Null)), Null, Null, Left, -192, Color(Blue), Color(Sky Blue), Color(Sky Blue), Visible To and String, Default Visibility);
        "display selected cc/orb info"
        Create HUD Text(If-Then-Else((Host Player).K, Host Player, Null), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else(And(Compare((Host Player).E, ==, 0), Compare(Count Of(Global.A), >, 0)), Custom String("\n 选中的检查点 \n 矢量: {0}{1} \n", Value In Array(Global.A, (Host Player).A), If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), <, 2), Custom String("", Null, Null, Null), Custom String("\n 传送点: {0}", Value In Array(Value In Array(Global.A, (Host Player).A), 1), Null, Null)), Null), If-Then-Else(And(Compare((Host Player).E, ==, 1), Compare(Count Of((Host Player).KillIndex_Cache), >, 0)), Custom String("\n 选中的击杀球 \n 矢量: {0} \n 半径: {1} \n", Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)), Value In Array(Global.I, Value In Array((Host Player).KillIndex_Cache, Global.J)), Null), If-Then-Else(And(Compare((Host Player).E, ==, 2), Compare(Count Of((Host Player).BounceIndex_Cache), >, 0)), Custom String("\n 选中的弹球 \n 矢量: {0} \n 弹力: {1} \n", Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Value In Array(Global.EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Null), Custom String("\n   当前无数据选中   \n", Null, Null, Null)))), If-Then-Else(And(Compare((Host Player).E, ==, 0), Compare(Count Of(Global.A), >, 0)), Custom String("\n Selected Checkpoint \n Vector: {0}{1} \n", Value In Array(Global.A, (Host Player).A), If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), <, 2), Custom String("", Null, Null, Null), Custom String("\n Teleport: {0}", Value In Array(Value In Array(Global.A, (Host Player).A), 1), Null, Null)), Null), If-Then-Else(And(Compare((Host Player).E, ==, 1), Compare(Count Of((Host Player).KillIndex_Cache), >, 0)), Custom String("\n Selected Kill Orb \n Vector: {0} \n radius: {1} \n", Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)), Value In Array(Global.I, Value In Array((Host Player).KillIndex_Cache, Global.J)), Null), If-Then-Else(And(Compare((Host Player).E, ==, 2), Compare(Count Of((Host Player).BounceIndex_Cache), >, 0)), Custom String("\n Selected Bounce Orb \n Vector: {0} \n strength: {1} \n", Value In Array(Global.TQ, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Value In Array(Global.EditMode, Value In Array((Host Player).BounceIndex_Cache, Global.TQ1)), Null), Custom String("\n   No data selected   \n", Null, Null, Null))))), Null, Null, Left, -191, Color(White), Color(Orange), Color(Orange), Visible To and String, Default Visibility);
        Wait(2, Ignore Condition);
        "effects ==========================================================================================================================================================================\r\n Purple bounce selection aura"
        Create Effect(If-Then-Else(And(And(Compare((Host Player).A, !=, -1), (Host Player).BouncePosition_Cache), Compare((Host Player).E, ==, 2)), All Players(All Teams), Null), Good Aura, Color(Purple), Global.TQ3, 1, Visible To Position and Radius);
        "Selected kill orb text"
        Create In-World Text(If-Then-Else(And(And(Compare((Host Player).A, !=, -1), (Host Player).KillPosition_Cache), Compare((Host Player).E, ==, 1)), All Players(All Teams), Null), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("已选中该弹球", Null, Null, Null), Custom String("Selected Kill Orb", Null, Null, Null)), Value In Array(Global.H, Value In Array((Host Player).KillIndex_Cache, Global.J)), 1.6, Do Not Clip, Visible To Position and String, Color(Sky Blue), Default Visibility);
        "Red distance orb for kill orb"
        Create Effect(If-Then-Else(And(And(Compare((Host Player).A, !=, -1), (Host Player).KillPosition_Cache), Compare((Host Player).E, ==, 1)), All Players(All Teams), Null), Orb, Color(Red), Global.L, 1, Visible To Position and Radius);
        "Distance # text for kill orb (removed the L from M string)"
        Create In-World Text(If-Then-Else(And(And(Compare((Host Player).A, !=, -1), (Host Player).KillPosition_Cache), Compare((Host Player).E, ==, 1)), All Players(All Teams), Null), Custom String("{0} m", Distance Between(Host Player, Global.L), Null, Null), Subtract(Global.L, Vector(0, 1.5, 0)), 1.5, Do Not Clip, Visible To Position and String, Color(Red), Default Visibility);
        "Purple sphere for teleport location"
        Create Effect(If-Then-Else(And(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), >, 1), Compare((Host Player).E, ==, 0)), All Players(All Teams), Null), Sphere, Color(Purple), Subtract(Value In Array(Value In Array(Global.A, (Host Player).A), 1), Vector(0, 0.1, 0)), 0.2, Visible To Position and Radius);
        "Teleport text"
        Create In-World Text(If-Then-Else(And(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), >, 1), Compare((Host Player).E, ==, 0)), All Players(All Teams), Null), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("传送点位置", Null, Null, Null), Custom String("teleporter location", Null, Null, Null)), Value In Array(Value In Array(Global.A, (Host Player).A), 1), 1.6, Do Not Clip, Visible To Position and String, Color(Sky Blue), Default Visibility);
        "normal cp if teleport"
        Create Effect(If-Then-Else(And(Value In Array(Value In Array(Global.A, (Host Player).A), 1), Compare((Host Player).E, ==, 0)), Host Player, Null), Ring, Color(Orange), First Of(Value In Array(Global.A, (Host Player).A)), 1, Visible To Position and Radius);
        Create In-World Text(If-Then-Else(And(Value In Array(Value In Array(Global.A, (Host Player).A), 1), Compare((Host Player).E, ==, 0)), Host Player, Null), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("检查点点的位置", Null, Null, Null), Custom String("level location", Null, Null, Null)), First Of(Value In Array(Global.A, (Host Player).A)), 1.6, Do Not Clip, Visible To Position and String, Color(Sky Blue), Default Visibility);
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
        Small Message(Host Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Value In Array(Array(Custom String("   当前模式: 击杀球", Null, Null, Null), Custom String("   当前模式: 弹球", Null, Null, Null), Custom String("   当前模式: 检查点", Null, Null, Null)), (Event Player).E), Value In Array(Array(Custom String("   Current mode: Kill Orb", Null, Null, Null), Custom String("   Current mode: Bounce Orb", Null, Null, Null), Custom String("   Current mode: Checkpoint", Null, Null, Null)), (Event Player).E)));
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
                Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   放置的检查点距离太近", Null, Null, Null), Custom String("   Cannot place checkpoints too close.", Null, Null, Null)));
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
                Set Global Variable(Dao, Mapped Array(Global.Dao, Add(Current Array Element, If-Then-Else(Compare(Current Array Element, >=, (Host Player).A), 1, 0))));
                Set Global Variable(SHIFT, Mapped Array(Global.SHIFT, Add(Current Array Element, If-Then-Else(Compare(Current Array Element, >=, (Host Player).A), 1, 0))));
                Call Subroutine(UpdateCache);
                Call Subroutine(RebuildKillOrbs);
                Call Subroutine(RebuildBounceOrbs);
            End;
            Small Message(All Players(All Teams), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   新检查点已创建", Null, Null, Null), Custom String("   New Checkpoint has been created", Null, Null, Null)));
        Else If(Compare((Event Player).E, ==, 1));
            If(Compare(Count Of(Global.A), <, 1));
                Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   请先放置检查点", Null, Null, Null), Custom String("   You first have to make a checkpoint", Null, Null, Null)));
            Else;
                If(Compare(Add(Add(Count Of(Global.TQ), Count Of(Global.H)), Count Of(Global.CustomPortalStart)), >=, 193));
                    Big Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("当前地图弹球/传送门数量已达上限", Null, Null, Null), Custom String("Orb/portal limit reached for this map", Null, Null, Null)));
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
                Big Message(All Players(All Teams), Custom String("{0} {1}", If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("新击杀球已创建! \r\n仅生效于检查点", Null, Null, Null), Custom String("New Kill Orb has been created! \r\nIt's only valid for checkpoint", Null, Null, Null)), (Event Player).A, Null));
            End;
        Else If(Compare((Event Player).E, ==, 2));
            If(Compare(Count Of(Global.A), <, 1));
                Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   请先放置检查点", Null, Null, Null), Custom String("   You first have to make a checkpoint", Null, Null, Null)));
            Else;
                If(Compare(Add(Add(Count Of(Global.TQ), Count Of(Global.H)), Count Of(Global.CustomPortalStart)), >=, 193));
                    Big Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("当前地图弹球/传送门数量已达上限", Null, Null, Null), Custom String("Orb/portal limit reached for this map", Null, Null, Null)));
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
                Big Message(All Players(All Teams), Custom String("{0} {1}", If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("新弹球已创建! \r\n仅生效于检查点", Null, Null, Null), Custom String("New Bounce Orb has been created! \r\nIt's only valid for checkpoint", Null, Null, Null)), (Event Player).A, Null));
            End;
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
        If(And(Compare((Event Player).E, ==, 0), Compare(Count Of(Global.A), >, 0)));
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
            Set Global Variable(Dao, Remove From Array(Global.Dao, (Host Player).A));
            Set Global Variable(SHIFT, Remove From Array(Global.SHIFT, (Host Player).A));
            Set Global Variable(Dao, Mapped Array(Global.Dao, Subtract(Current Array Element, If-Then-Else(Compare(Current Array Element, >=, (Host Player).A), 1, 0))));
            Set Global Variable(SHIFT, Mapped Array(Global.SHIFT, Subtract(Current Array Element, If-Then-Else(Compare(Current Array Element, >=, (Host Player).A), 1, 0))));
            Modify Global Variable(A, Remove From Array By Index, (Host Player).A);
            Modify Global Variable(C, Remove From Array By Index, (Host Player).A);
            If(Or(And(Compare((Host Player).A, ==, 0), Compare(Count Of(Global.A), >, 0)), Compare(Global.A, ==, Empty Array)));
                Set Player Variable(Host Player, A, 0);
                Skip(2);
            End;
            Modify Player Variable(Host Player, A, Subtract, 1);
            Call Subroutine(RebuildKillOrbs);
            Call Subroutine(RebuildBounceOrbs);
            Small Message(All Players(All Teams), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   检查点已删除", Null, Null, Null), Custom String("   Checkpoint has been deleted", Null, Null, Null)));
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

rule ("Editor | cp add/remove teleport") {
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
    }
    actions {
        Wait Until(Or(Is Button Held(Host Player, Button(Melee)), Not(And(Is Button Held(Host Player, Button(Interact)), Is Button Held(Host Player, Button(Reload))))), 1);
        Abort If(Or(Is Button Held(Host Player, Button(Melee)), And(Is Button Held(Host Player, Button(Interact)), Is Button Held(Host Player, Button(Reload)))));
        If(Compare((Host Player).A, ==, 0));
            Small Message(Host Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   不能在第一个检查点设置传送门", Null, Null, Null), Custom String("   Can't place a teleport on first checkpoint", Null, Null, Null)));
            Abort;
        End;
        "remove"
        If(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), >, 1));
            Set Global Variable At Index(A, (Host Player).A, First Of(Value In Array(Global.A, (Host Player).A)));
            Small Message(Host Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   等级{0}的传送被移除", (Host Player).A, Null, Null), Custom String("   Teleport for level {0} has been removed", (Host Player).A, Null, Null)));
        "add"
        Else;
            Set Global Variable At Index(A, (Host Player).A, Array(If-Then-Else(Compare(Count Of(Value In Array(Global.A, (Host Player).A)), !=, 0), First Of(Value In Array(Global.A, (Host Player).A)), Value In Array(Global.A, (Host Player).A)), Position Of(Host Player)));
            Small Message(Host Player, Custom String("{0} {1}", If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   传送点已添加到检查点", Null, Null, Null), Custom String("   Teleport has been added for level", Null, Null, Null)), (Host Player).A, Null));
        End;
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
        If(Value In Array(Value In Array(Global.A, (Host Player).A), 1));
            Set Global Variable At Index(A, (Host Player).A, Array(Position Of(Event Player), Value In Array(Value In Array(Global.A, (Host Player).A), 1)));
        Else;
            Set Global Variable At Index(A, (Host Player).A, Position Of(Event Player));
        End;
        Small Message(Host Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   检查点已移动至当前位置", Null, Null, Null), Custom String("   Checkpoint has been moved to your position", Null, Null, Null)));
        Wait(0.016, Ignore Condition);
    }
}

rule ("Editor | precision moving") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Event Player).EditorOn != False;
        Event Player == Host Player;
        (Event Player).E == 0;
        Is Button Held(Event Player, Button(Melee)) == True;
        Count Of(Global.A) > 0;
        Is Button Held(Event Player, Button(Interact)) == False;
    }
    actions {
        Wait(1, Abort When False);
        Set Move Speed(Event Player, 3);
        Start Camera(Event Player, Add(Add(Eye Position(Event Player), Multiply(Facing Direction Of(Event Player), -2.5)), Vector(0, 0.5, 0)), Eye Position(Event Player), 15);
        "while eventPlayer.isHoldingButton(Button.ULTIMATE) and eventPlayer.EditModeSelection == 0 and eventPlayer.isAlive():"
        While(And(And(And(Is Button Held(Event Player, Button(Melee)), Compare((Event Player).E, ==, 0)), Is Alive(Event Player)), Not(Is Button Held(Event Player, Button(Interact)))));
            "CheckpointPositions[eventPlayer.CurrentCheckpoint][0] = eventPlayer.getPosition()"
            If(Count Of(Value In Array(Global.A, (Host Player).A)));
                Set Global Variable At Index(A, (Host Player).A, Array(Position Of(Event Player), Value In Array(Value In Array(Global.A, (Host Player).A), 1)));
            Else;
                Set Global Variable At Index(A, (Host Player).A, Position Of(Event Player));
            End;
            Wait(0.016, Ignore Condition);
        End;
        Stop Camera(Event Player);
        Set Move Speed(Event Player, 100);
    }
}

rule ("add ult/dash") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        (Host Player).EditorOn != False;
        Event Player == Host Player;
        (Host Player).E == 0;
        Count Of(Global.A) > 0;
        "@Condition eventPlayer.isHoldingButton(Button.ULTIMATE) or eventPlayer.isHoldingButton(Button.ABILITY_1)\r\n@Condition eventPlayer.isHoldingButton(Button.INTERACT)"
        Or(Is Button Held(Event Player, Button(Primary Fire)), Is Button Held(Event Player, Button(Secondary Fire))) == True;
        Is Button Held(Event Player, Button(Ultimate)) == True;
    }
    actions {
        If(Is Button Held(Event Player, Button(Primary Fire)));
            If(Array Contains(Global.Dao, (Event Player).A));
                Set Global Variable(Dao, Remove From Array(Global.Dao, (Event Player).A));
            Else;
                Modify Global Variable(Dao, Append To Array, (Event Player).A);
            End;
        Else;
            If(Array Contains(Global.SHIFT, (Event Player).A));
                Set Global Variable(SHIFT, Remove From Array(Global.SHIFT, (Event Player).A));
            Else;
                Modify Global Variable(SHIFT, Append To Array, (Event Player).A);
            End;
        End;
        "move in other rule"
        Wait(0.016, Ignore Condition);
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
        Disable Built-In Game Mode Completion;
        Disable Built-In Game Mode Scoring;
        Disable Built-In Game Mode Music;
        Disable Built-In Game Mode Announcer;
        Start Forcing Spawn Room(All Teams, 0);
        Start Forcing Spawn Room(All Teams, 1);
        Start Forcing Spawn Room(All Teams, 2);
        "wait for map data rule"
        Wait(0.024, Ignore Condition);
        If(And(Compare(Global.Dao, ==, Null), Compare(Count Of(Global.Dao), ==, 1)));
            Set Global Variable(Dao, Array(0));
        Else;
            Set Global Variable(Dao, If-Then-Else(And(Count Of(Filtered Array(Global.Dao, And(Compare(Current Array Element, !=, -1), Compare(Current Array Element, !=, Empty Array)))), Compare(Global.Dao, !=, Null)), Global.Dao, Empty Array));
        End;
        If(And(Compare(Global.SHIFT, ==, Null), Compare(Count Of(Global.SHIFT), ==, 1)));
            Set Global Variable(SHIFT, Array(0));
        Else;
            Set Global Variable(SHIFT, If-Then-Else(And(Count Of(Filtered Array(Global.SHIFT, And(Compare(Current Array Element, !=, -1), Compare(Current Array Element, !=, Empty Array)))), Compare(Global.SHIFT, !=, Null)), Global.SHIFT, Empty Array));
        End;
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
        Set Global Variable(TitleData, Null);
        Set Global Variable(PortalNames, Empty Array);
        Set Global Variable(PortalLoc, Empty Array);
        Set Global Variable(PortalDest, Empty Array);
        Set Global Variable(CustomPortalStart, Empty Array);
        Set Global Variable(CustomPortalEndpoint, Empty Array);
        Set Global Variable(CustomPortalCP, Empty Array);
        Wait(1, Ignore Condition);
        Set Global Variable(DashExploitToggle, Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)", Null, Null, Null), Custom String("ban Dash Start - 0关卡Shift", Null, Null, Null), ${ban_dashstart}, 2));
        Set Global Variable(PortalOn, Workshop Setting Toggle(Custom String("map settings \n地图设置", Null, Null, Null), Custom String("enable portals (control maps) - 启用传送门 (占点地图)", Null, Null, Null), ${portalon}, 10));
        Set Global Variable(CompMode, Workshop Setting Toggle(Custom String("Competitive mode\n竞赛模式", Null, Null, Null), Custom String("Turn on competitive mode - 开启竞赛模式", Null, Null, Null), ${compon}, 100));
        If(Global.CompMode);
            "-! comp minutes !- \r\n 5-240"
            Set Global Variable(CompTime, Workshop Setting Integer(Custom String("Competitive mode\n竞赛模式", Null, Null, Null), Custom String("time limit (global) - 时间限制", Null, Null, Null), ${comptime}, 1, 240, 101));
            "-! comp attempt count !-"
            Set Global Variable(CompAtmpNum, Workshop Setting Integer(Custom String("Competitive mode\n竞赛模式", Null, Null, Null), Custom String("attempt count - 尝试次数", Null, Null, Null), ${compattempt}, 0, 500, 102));
            "-! comp restartlimiter !-"
            Set Global Variable(CompRestartLimit, Workshop Setting Toggle(Custom String("Competitive mode\n竞赛模式", Null, Null, Null), Custom String("disable restart during run - 竞赛中禁用重新开始", Null, Null, Null), ${comprestarts}, 103));
        Else;
            Set Global Variable(instructiontext, Null);
        End;
        "add back to below wait if removed"
        Wait(1, Ignore Condition);
        "clean out -1's after the ban has laoded"
        Set Global Variable(BanBhop, Remove From Array(Global.BanBhop, -1));
        Set Global Variable(BanClimb, Remove From Array(Global.BanClimb, -1));
        Set Global Variable(BanEmote, Remove From Array(Global.BanEmote, -1));
        Set Global Variable(BanDead, Remove From Array(Global.BanDead, -1));
        Set Global Variable(BanCreate, Remove From Array(Global.BanCreate, -1));
        Set Global Variable(BanMulti, Remove From Array(Global.BanMulti, -1));
        Set Global Variable(BanTriple, Remove From Array(Global.BanTriple, -1));
        Wait(4, Ignore Condition);
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
        "if getCurrentGamemode() == Gamemode.HYBRID:\r\n    TimeRemaining = 89\r\nelse:"
        Set Global Variable(TimeRemaining, 265);
        While(Compare(Global.TimeRemaining, >, 0));
            Wait(60, Ignore Condition);
            Modify Global Variable(TimeRemaining, Subtract, 1);
            If(Global.CompMode);
                Modify Global Variable(CompTime, Subtract, 1);
                If(Compare(Global.CompTime, ==, 0));
                    Big Message(All Players(All Teams), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("时间到了", Null, Null, Null), Custom String("time's up", Null, Null, Null)));
                    Set Player Variable(All Players(All Teams), CompDone, True);
                    Stop Chasing Player Variable(All Players(All Teams), D);
                    Disable Built-In Game Mode Respawning(All Players(All Teams));
                    Kill(All Players(All Teams), Null);
                    Wait(0.032, Ignore Condition);
                    Start Rule(CreateLeaderBoard, Restart Rule);
                End;
            End;
        End;
        Big Message(All Players(All Teams), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("房间已达最大持续时间, 即将重启", Null, Null, Null), Custom String("maximum lobby time expired, restarting", Null, Null, Null)));
        Wait(5, Ignore Condition);
        If(Compare(Current Game Mode, ==, Game Mode(Deathmatch)));
            Declare Player Victory(Host Player);
        Else;
            Declare Team Victory(Team Of(Host Player));
    }
}

rule ("Player Initialize") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    actions {
        "eventPlayer.EditorOn = createWorkshopSetting(bool, \"Editor - 作图模式\",\"Editor mode - 作图模式\" ,  editoron , 0) # Turn Editor On\r\n Turn Editor On"
        Set Player Variable(Event Player, EditorOn, Workshop Setting Toggle(Custom String("map settings \n地图设置", Null, Null, Null), Custom String("Editor mode - 作图模式", Null, Null, Null), ${editoron}, -1));
        Abort If(And(Is Dummy Bot(Event Player), Compare(Hero Of(Event Player), ==, Hero(D.Va))));
        Set Player Variable(Event Player, K, True);
        Disable Game Mode HUD(Event Player);
        Enable Death Spectate All Players(Event Player);
        Enable Death Spectate Target HUD(Event Player);
        Preload Hero(Event Player, Hero(Genji));
        Set Respawn Max Time(Event Player, 1);
        Set Player Variable(Event Player, F, False);
        "Climbing the wall prompts the HUD"
        Set Player Variable(Event Player, J, False);
        Set Player Variable(Event Player, TY, 0);
        Set Player Variable(Event Player, bouncetouchedlast, -1);
        "big waits first for about 1 second before loading, to make sure things like comp mode are fully loaded and configured, load fx in meanwhile"
        Wait(1, Ignore Condition);
        Create Effect(Event Player, Ring, Color(Sky Blue), Last Of(Value In Array(Global.A, (Event Player).A)), 1, Position and Radius);
        Create Effect(If-Then-Else((Event Player).NotOnLastCp, Event Player, Null), Ring, Color(Lime Green), Value In Array(Global.A, Add((Event Player).A, 1)), 1, Visible To Position and Radius);
        Wait(0.5, Ignore Condition);
        Create Effect(If-Then-Else((Event Player).NotOnLastCp, Event Player, Null), Light Shaft, Color(White), Value In Array(Global.A, Add((Event Player).A, 1)), 1, Visible To Position and Radius);
        Create Icon(If-Then-Else((Event Player).NotOnLastCp, Event Player, Null), Add(Value In Array(Global.A, Add((Event Player).A, 1)), Up), Arrow: Down, Visible To and Position, Color(Sky Blue), True);
        Wait(0.5, Ignore Condition);
        Create In-World Text(If-Then-Else(And((Event Player).NotOnLastCp, (Event Player).K), Event Player, Null), If-Then-Else(And((Event Player).BounceLockMax_Cache, Compare(Count Of((Event Player).LockCollected), <, (Event Player).BounceLockMax_Cache)), Custom String("{0} {1}", Icon String(Warning), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("先收集橙球", Null, Null, Null), Custom String("collect orbs first", Null, Null, Null)), Null), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("到这里来", Null, Null, Null), Custom String("Come here", Null, Null, Null))), Value In Array(Global.A, Add((Event Player).A, 1)), 1.5, Do Not Clip, Visible To Position and String, Color(White), Default Visibility);
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
            End;
            If(Or(Compare((Event Player).AttemptCount, ==, -1), Compare(Global.CompTime, <, 1)));
                Set Player Variable(Event Player, CompDone, True);
            End;
        End;
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
                Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player, Null, Null), (Event Player).D, Custom String("{0} {1}", (Event Player).D, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("秒", Null, Null, Null), Custom String("sec", Null, Null, Null)), Null))));
                Call Subroutine(CreateLeaderBoard);
            End;
        "you are not in list yet"
        Else;
            "board has room for more"
            If(Compare(Count Of(Global.LeaderBoardFull), <, 20));
                Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player, Null, Null), (Event Player).D, Custom String("{0} {1}", (Event Player).D, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("秒", Null, Null, Null), Custom String("sec", Null, Null, Null)), Null))));
                Call Subroutine(CreateLeaderBoard);
            "20 entries already"
            Else;
                "your time lower then last entry"
                If(Compare(Value In Array(Value In Array(Global.LeaderBoardFull, 19), 1), <, (Event Player).D));
                    Skip(7);
                "you beat the last entry, thus replacing it"
                Else;
                    Modify Global Variable(LeaderBoardFull, Remove From Array By Index, 19);
                    Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player, Null, Null), (Event Player).D, Custom String("{0} {1}", (Event Player).D, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("秒", Null, Null, Null), Custom String("sec", Null, Null, Null)), Null))));
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
        Set Player Variable(Event Player, splittime, If-Then-Else((Event Player).PracticeToggle, (Event Player).practicetimer, (Event Player).D));
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
        If(Global.DashExploitToggle);
            Set Ability 1 Enabled(Event Player, False);
            If(Is Using Ability 1(Event Player));
                Wait Until(Not(Is Using Ability 1(Event Player)), 1.5);
                Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   0关卡Shift已禁用!", Null, Null, Null), Custom String("   Dash Start is banned!", Null, Null, Null)));
            End;
        End;
        If(Is Using Ultimate(Event Player));
            Kill(Event Player, Null);
        End;
        If(Compare(Count Of(Global.A), !=, 0));
            "restarting reset t itle even if non on cp 0"
            Destroy In-World Text((Event Player).TitleStore);
            "load saved progres"
            If(Array Contains(Global.SaveName, Custom String("{0}", Event Player, Null, Null)));
                Set Global Variable At Index(SaveEnt, Index Of Array Value(Global.SaveName, Custom String("{0}", Event Player, Null, Null)), Event Player);
                Set Player Variable(Event Player, A, Value In Array(Global.SaveCp, Index Of Array Value(Global.SaveEnt, Event Player)));
                Set Player Variable(Event Player, D, Value In Array(Global.SaveTimer, Index Of Array Value(Global.SaveEnt, Event Player)));
                Set Global Variable At Index(SaveElapsed, Index Of Array Value(Global.SaveEnt, Event Player), Total Time Elapsed);
                Set Global Variable At Index(SavePauseTime, Index Of Array Value(Global.SaveEnt, Event Player), 0);
                Set Global Variable At Index(SavePauseEnabled, Index Of Array Value(Global.SaveEnt, Event Player), False);
                Teleport(Event Player, Add(Value In Array(Global.A, (Event Player).A), Up));
                "if any title data, find last cp"
                If(And(And(Compare(Global.TitleData, !=, Null), Is True For Any(Filtered Array(First Of(Global.TitleData), Compare(Current Array Element, <=, (Event Player).A)), Current Array Element)), Not((Event Player).EditorOn)));
                    Create In-World Text(If-Then-Else((Event Player).invis, Null, All Players(All Teams)), Value In Array(Value In Array(Global.TitleData, 1), Index Of Array Value(First Of(Global.TitleData), First Of(Sorted Array(Filtered Array(First Of(Global.TitleData), Compare(Current Array Element, <=, (Event Player).A)), Multiply(Current Array Element, -1))))), Event Player, 1.1, Clip Against Surfaces, Visible To and Position, Value In Array(Value In Array(Global.TitleData, 2), Index Of Array Value(First Of(Global.TitleData), First Of(Sorted Array(Filtered Array(First Of(Global.TitleData), Compare(Current Array Element, <=, (Event Player).A)), Multiply(Current Array Element, -1))))), Default Visibility);
                    Set Player Variable(Event Player, TitleStore, Last Text ID);
                End;
            Else;
                "dont remove up because now people are used to it and see it as a tech"
                Teleport(Event Player, Add(First Of(Global.A), Up));
                Set Player Variable(Event Player, A, 0);
                Set Player Variable(Event Player, D, 0);
                Stop Chasing Player Variable(Event Player, ztjs);
                Set Player Variable(Event Player, ztjs, 0);
                Call Subroutine(MakeSave);
                Call Subroutine(UpdateTitle);
            End;
        End;
        Set Player Variable(Event Player, splittime, 0);
        Chase Player Variable At Rate(Event Player, D, 9999999, 1, None);
        Set Status(Event Player, Null, Phased Out, 9999);
        Set Status(Event Player, Null, Invincible, 9999);
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Set Player Variable(Event Player, C, False);
        Enable Built-In Game Mode Respawning(Event Player);
        Set Player Variable(Event Player, F, False);
        "eventPlayer.LockState = false"
        Call Subroutine(UpdateCache);
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
                    Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   ! 进点前需收集齐所有黄弹球 !", Null, Null, Null), Custom String("   ! collect ALL orange orbs to unlock !", Null, Null, Null)));
                    Kill(Event Player, Null);
                    Skip(64);
                End;
                If(And((Event Player).ban_climb, (Event Player).J));
                    Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   爬墙 ↑ 已禁用!", Null, Null, Null), Custom String("   Climb ↑ is banned!", Null, Null, Null)));
                    Call Subroutine(checkpointFailReset);
                    Skip(59);
                End;
                If(And((Event Player).ban_bhop, Not(Or(Compare((Event Player).O, ==, 0), Compare((Event Player).CH, ==, Color(Green))))));
                    Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   ≥ 留小跳进点!", Null, Null, Null), Custom String("   ≥ You need to have a bhop to complete!", Null, Null, Null)));
                    Call Subroutine(checkpointFailReset);
                    Skip(54);
                End;
                Set Player Variable(Event Player, LockCollected, Empty Array);
                Modify Player Variable(Event Player, A, Add, 1);
                Call Subroutine(UpdateCache);
                "remove ult feature disabled for speedruning purposes\r\nif eventPlayer.isUsingUltimate() and not eventPlayer.CurrentCheckpoint in BladeEnabledCheckpoints:\r\n    kill(eventPlayer, null)\r\n teleport cps"
                If(Compare(Count Of(Value In Array(Global.A, (Event Player).A)), >, 1));
                    Start Forcing Player Position(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)), False);
                    Wait(0.1, Ignore Condition);
                    Set Player Variable(Event Player, flytoggle, Null);
                    Stop Forcing Player Position(Event Player);
                    "position wasnt ready when check cache ran"
                    Start Rule(CheckUlt, Restart Rule);
                    Start Rule(CheckDash, Restart Rule);
                End;
                If(Compare((Event Player).splitdisplay, !=, -999));
                    Set Player Variable(Event Player, splitdisplay, Subtract(If-Then-Else((Event Player).PracticeToggle, (Event Player).practicetimer, (Event Player).D), (Event Player).splittime));
                End;
                Wait(0.016, Ignore Condition);
                Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
                Play Effect(If-Then-Else(Or(Global.CompMode, (Event Player).invis), Event Player, All Players(All Teams)), Ring Explosion, Color(Sky Blue), Add(Value In Array(Global.A, (Event Player).A), Vector(0, 1.5, 0)), 4);
                "bigMessage(eventPlayer, \"Arrived at {0} / {1}{2}\".format(eventPlayer.CurrentCheckpoint, len(CheckpointPositions) - 1, \" - Split {}\".format(eventPlayer.splitdisplay) if eventPlayer.splitson else \"\"))"
                Big Message(Event Player, Custom String("{0} {1}", If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("抵达检查点", Null, Null, Null), Custom String("Arrived at level", Null, Null, Null)), (Event Player).A, Null));
                Wait(0.016, Ignore Condition);
                Call Subroutine(UpdateTitle);
                If((Event Player).PracticeToggle);
                    Set Player Variable(Event Player, splittime, (Event Player).practicetimer);
                    Skip(30);
                End;
                Set Player Variable(Event Player, splittime, (Event Player).D);
                "complete lvl"
                If(And(And(Compare((Event Player).A, ==, Subtract(Count Of(Global.A), 1)), Not((Event Player).EditorOn)), Not((Event Player).PracticeToggle)));
                    Stop Chasing Player Variable(Event Player, D);
                    Stop Chasing Player Variable(Event Player, practicetimer);
                    Wait(0.016, Ignore Condition);
                    Big Message(All Players(All Teams), Custom String("{0} {1} {2}", Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("已通关! 用时 ", Null, Null, Null), Custom String("Mission complete! Time", Null, Null, Null)), Custom String("{0} {1}", (Event Player).D, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("秒", Null, Null, Null), Custom String("sec", Null, Null, Null)), Null)));
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
        Set Player Variable(Event Player, LockCollected, Empty Array);
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
        "prevent same one trigering twice in a row"
        If(Compare((Event Player).bouncetouched, ==, (Event Player).bouncetouchedlast));
            Wait(0.24, Ignore Condition);
            "-1 because null becomes 0 and thats a legit index"
            Set Player Variable(Event Player, bouncetouchedlast, -1);
            Loop If Condition Is True;
            "only return if no others in radius"
            Abort;
        End;
        Set Player Variable(Event Player, bouncetouchedlast, (Event Player).bouncetouched);
        If(Compare(Value In Array((Event Player).BounceStrength_Cache, (Event Player).bouncetouched), !=, 0));
            Apply Impulse(Event Player, Up, Value In Array((Event Player).BounceStrength_Cache, (Event Player).bouncetouched), To World, Cancel Contrary Motion);
        End;
        If(Value In Array((Event Player).BounceUlt_Cache, (Event Player).bouncetouched));
            Set Ultimate Ability Enabled(Event Player, True);
            Set Ultimate Charge(Event Player, 100);
            Small Message(Event Player, Custom String("   {0} {1} ", Ability Icon String(Hero(Genji), Button(Ultimate)), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("#终极技能已就绪", Null, Null, Null), Custom String("Ultimate is ready", Null, Null, Null)), Null));
            Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
        End;
        If(Value In Array((Event Player).BounceLock_Cache, (Event Player).bouncetouched));
            Modify Player Variable(Event Player, LockCollected, Append To Array, Value In Array((Event Player).BouncePosition_Cache, (Event Player).bouncetouched));
            Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   黄球已收集", Null, Null, Null), Custom String("   orb has been collected", Null, Null, Null)));
            Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
        End;
        If(Value In Array((Event Player).BounceDash_Cache, (Event Player).bouncetouched));
            If(Is Using Ability 1(Event Player));
                Wait Until(Not(Is Using Ability 1(Event Player)), 1);
                "wait til set false by check"
                Wait(0.032, Ignore Condition);
            End;
            Set Ability 1 Enabled(Event Player, True);
            Small Message(Event Player, Custom String("   {0} {1} ", Ability Icon String(Hero(Genji), Button(Ability 1)), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("技能1影已就绪", Null, Null, Null), Custom String("Dash is ready", Null, Null, Null)), Null));
            Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
        End;
        Wait(0.24, Ignore Condition);
        Loop If Condition Is True;
        Set Player Variable(Event Player, bouncetouchedlast, -1);
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
        Clear Status(Event Player, Phased Out);
        Resurrect(Event Player);
        Call Subroutine(checkpointFailReset);
        "rest is to prevent dead spaming from crashign server\r\n but doing waits only when needed"
        Wait Until(Is Alive(Event Player), 1);
        Wait Until(Is Dead(Event Player), 1);
        If(And(And(Is Dead(Event Player), Not((Event Player).F)), Not((Event Player).CompDone)));
            Wait(0.16, Ignore Condition);
            Clear Status(Event Player, Phased Out);
            Resurrect(Event Player);
            Call Subroutine(checkpointFailReset);
            Wait Until(Is Alive(Event Player), 1);
            Wait Until(Is Dead(Event Player), 1);
            If(And(And(Is Dead(Event Player), Not((Event Player).F)), Not((Event Player).CompDone)));
                Wait(0.44, Ignore Condition);
                Clear Status(Event Player, Phased Out);
                Resurrect(Event Player);
                Call Subroutine(checkpointFailReset);
                Wait Until(Is Alive(Event Player), 1);
                Wait Until(Is Dead(Event Player), 1);
                If(And(And(Is Dead(Event Player), Not((Event Player).F)), Not((Event Player).CompDone)));
                    Wait(0.64, Ignore Condition);
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
        "delay if its for afk sleep"
        If(Has Status(Event Player, Invincible));
            Wait(0.16, Ignore Condition);
        End;
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

rule ("AFK timer") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Moving(Event Player) == False;
        Is Alive(Event Player) == True;
        (Event Player).EditorOn == False;
    }
    actions {
        Wait(300, Abort When False);
        "clear status to apply sleep, auto re-aply via normal aply rule"
        Clear Status(Event Player, Phased Out);
        Wait(0.016, Ignore Condition);
        Clear Status(Event Player, Invincible);
        Wait(0.016, Ignore Condition);
        Set Status(Event Player, Null, Asleep, 9999);
        "raycast to prevent camera stuck on low wall"
        Start Camera(Event Player, Add(Position Of(Event Player), Multiply(Up, Subtract(Distance Between(Position Of(Event Player), Ray Cast Hit Position(Position Of(Event Player), Add(Position Of(Event Player), Vector(0, 4, 0)), Null, Null, False)), 1))), Position Of(Event Player), 10);
        "cancel it after jumping or not sleep, reset cures sleep"
        Wait(1, Ignore Condition);
        Wait Until(Or(Is Button Held(Event Player, Button(Jump)), Not(Has Status(Event Player, Asleep))), 99999);
        Clear Status(Event Player, Asleep);
        Stop Camera(Event Player);
        Wait Until(Is On Wall(Event Player), 2);
        "prevent save bhop climb"
        If(Is On Wall(Event Player));
            Cancel Primary Action(Event Player);
        End;
        Loop If Condition Is True;
    }
}

rule ("Huds: Global/Localplayer") {
    event {
        Ongoing - Global;
    }
    actions {
        Wait(2, Ignore Condition);
        "name/credit construction\r\n note on changing default name/credit\r\n if you change it, also change it in the credits rule\r\n the old credits should always remain valid here to keep old data valid"
        If(Or(Compare(Global.Name, !=, Custom String("name here - 作者", Null, Null, Null)), Compare(First Of(Global.Cachedcredits), ==, Null)));
            Set Global Variable At Index(Cachedcredits, 0, Global.Name);
        End;
        If(Or(Compare(Global.Code, !=, Custom String("code here - 代码", Null, Null, Null)), Compare(Value In Array(Global.Cachedcredits, 1), ==, Null)));
            Set Global Variable At Index(Cachedcredits, 1, Global.Code);
        End;
        Set Global Variable(Name, Null);
        Set Global Variable(Code, Null);
        Create HUD Text(All Players(All Teams), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("作者: {0}", First Of(Global.Cachedcredits), Null, Null), Custom String("Made by: {0}", First Of(Global.Cachedcredits), Null, Null)), Left, -200, Null, Null, Color(Violet), Visible To and String, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        Create HUD Text(All Players(All Teams), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("代码: {0}", Value In Array(Global.Cachedcredits, 1), Null, Null), Custom String("Map code: {0}", Value In Array(Global.Cachedcredits, 1), Null, Null)), Left, -199, Null, Null, Color(Sky Blue), Visible To and String, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        Create HUD Text(If-Then-Else((Local Player).K, Local Player, Null), Null, Null, Custom String("Discord: dsc.gg/genjiparkour", Null, Null, Null), Left, -198, Null, Null, Color(Aqua), Visible To, Default Visibility);
        "global huds"
        Create HUD Text(All Players(All Teams), Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("房间将在 {0} 分钟后重启 - V{1}", Global.TimeRemaining, Custom String("1.8.2b", Null, Null, Null), Null), Custom String("Server Restarts In {0} Min - V{1}", Global.TimeRemaining, Custom String("1.8.2b", Null, Null, Null), Null)), Null, Right, -161, Null, Color(Red), Null, Visible To and String, Visible Always);
        "padding for custom hud display"
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nv", Null, Null, Null), Top, -163, Null, Null, Color(Orange), Visible To, Default Visibility);
        Create HUD Text(If-Then-Else((Local Player).K, Local Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0}+{1}+{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 2)), Custom String("{0} | 重新开始\n长按 {1} | 完整成绩排名", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)), Null)), Custom String("{0}+{1}+{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 2)), Custom String("{0} | Restart\nHold {1} | leaderboard", Input Binding String(Button(Interact)), Input Binding String(Button(Melee)), Null))), Right, -160, Null, Null, Color(White), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else((Local Player).K, Local Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0} {1} |  {2}", If-Then-Else((Local Player).quick_restart, Custom String("", Null, Null, Null), Custom String("长按", Null, Null, Null)), Input Binding String(Button(Reload)), If-Then-Else((Local Player).quick_restart, Custom String("快速回点 | 启用", Null, Null, Null), Custom String("启用快速回点", Null, Null, Null))), Custom String("{0} {1} |  {2}", If-Then-Else((Local Player).quick_restart, Custom String("", Null, Null, Null), Custom String("Hold", Null, Null, Null)), Input Binding String(Button(Reload)), If-Then-Else((Local Player).quick_restart, Custom String("Quick reset", Null, Null, Null), Custom String("Enable Quick reset", Null, Null, Null)))), Right, -158, Null, Null, Color(White), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else((Local Player).K, Local Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0}+{1} | 探点模式{2}", Input Binding String(Button(Reload)), Input Binding String(Button(Melee)), If-Then-Else((Local Player).C, Custom String(" | 启用", Null, Null, Null), Custom String("", Null, Null, Null))), Custom String("{0}+{1} | Invincible{2}", Input Binding String(Button(Reload)), Input Binding String(Button(Melee)), If-Then-Else((Local Player).C, Custom String(" | ON", Null, Null, Null), Custom String("", Null, Null, Null)))), Right, -159, Null, Null, If-Then-Else((Local Player).C, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, If-Then-Else((Local Player).K, Custom String("", Null, Null, Null), Custom String("{0}{1}{2}", If-Then-Else((Local Player).C, Ability Icon String(Hero(Baptiste), Button(Ability 2)), Custom String("", Null, Null, Null)), If-Then-Else((Local Player).PracticeToggle, Ability Icon String(Hero(D.Va), Button(Ultimate)), Custom String("", Null, Null, Null)), If-Then-Else((Local Player).invis, Ability Icon String(Hero(Sombra), Button(Ability 1)), Custom String("", Null, Null, Null)))), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("长按 {0} | 切换显示HUD", Input Binding String(Button(Secondary Fire)), Null, Null), Custom String("Hold {0} | toggle hud", Input Binding String(Button(Secondary Fire)), Null, Null)), Right, -155, Color(White), Color(White), Color(White), Visible To and String, Default Visibility);
        Create HUD Text(If-Then-Else((Local Player).K, Local Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("长按 {0} | 预览弹球/传送门", Input Binding String(Button(Primary Fire)), Null, Null), Custom String("Hold {0} | Preview orb/portal", Input Binding String(Button(Primary Fire)), Null, Null)), Right, -153, Null, Null, If-Then-Else((Local Player).PreviewsArray, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        Create HUD Text(If-Then-Else(And((Local Player).PreviewsArray, (Local Player).K), Local Player, Null), Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("移动键 左/右 ↔| 预览其他\n视角移动 | 调整浏览视角", Null, Null, Null), Custom String("Walk left/right ↔| preview others\nAim | change preview angle", Null, Null, Null)), Null, Right, -152, Null, Color(Lime Green), Null, Visible To and String, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        Create HUD Text(All Players(All Teams), Null, Null, If-Then-Else(Compare((Local Player).splitdisplay, ==, -999), Custom String("", Null, Null, Null), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else((Local Player).F, Custom String("", Null, Null, Null), Custom String("单关用时 {0}", (Local Player).splitdisplay, Null, Null)), If-Then-Else((Local Player).F, Custom String("", Null, Null, Null), Custom String("Split: {0}", (Local Player).splitdisplay, Null, Null)))), Left, -195, Null, Null, Color(White), Visible To and String, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        Call Subroutine(CreateLeaderBoard);
        "text per checkpoint  text per cp each"
        If(Compare(Global.CpHudText, !=, Null));
            "hudSubtext(getAllPlayers(), \"                                                   \\r\\n  \\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\", HudPosition.TOP, HO.filler_custommsg, Color.ORANGE, HudReeval.VISIBILITY, SpecVisibility.DEFAULT)"
            Create HUD Text(All Players(All Teams), If-Then-Else(And(Array Contains(Global.CpHudCp, (Local Player).A), (Local Player).K), Value In Array(Global.CpHudText, Index Of Array Value(Global.CpHudCp, (Local Player).A)), Custom String("", Null, Null, Null)), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else(And(Array Contains(Global.CpHudCp, (Local Player).A), Not((Local Player).K)), Custom String("(文本已隐藏)", Null, Null, Null), Custom String("", Null, Null, Null)), If-Then-Else(And(Array Contains(Global.CpHudCp, (Local Player).A), Not((Local Player).K)), Custom String("(text hidden)", Null, Null, Null), Custom String("", Null, Null, Null))), Null, Top, -171, Color(Blue), Color(Blue), Color(Blue), Visible To and String, Default Visibility);
        End;
        If(Compare(Global.CpIwtText, !=, Null));
            Create In-World Text(All Players(All Teams), If-Then-Else(Array Contains(Global.CpIwtCp, (Local Player).A), Value In Array(Global.CpIwtText, Index Of Array Value(Global.CpIwtCp, (Local Player).A)), Custom String("", Null, Null, Null)), Value In Array(Global.CpIwtPos, Index Of Array Value(Global.CpIwtCp, (Local Player).A)), 2, Clip Against Surfaces, Visible To Position and String, Global.CpIwtColor, Default Visibility);
        End;
        If(Global.CompMode);
            Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Custom String("                                                                                                                           ", Null, Null, Null), Null, Null, Top, -182, Color(White), Null, Null, Visible To, Default Visibility);
            If(First Of(Global.instructiontext));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, First Of(Global.instructiontext), Top, -181, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            If(Value In Array(Global.instructiontext, 1));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, Value In Array(Global.instructiontext, 1), Top, -180, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            If(Value In Array(Global.instructiontext, 2));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, Value In Array(Global.instructiontext, 2), Top, -179, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            If(Value In Array(Global.instructiontext, 3));
                Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Null, Null, Value In Array(Global.instructiontext, 3), Top, -178, Null, Null, Color(White), Visible To, Default Visibility);
            End;
            Create HUD Text(Filtered Array(All Players(All Teams), (Current Array Element).instructionhud), Custom String("                                   Press {0} to start                                ", Input Binding String(Button(Interact)), Null, Null), Null, Null, Top, -177, Color(White), Null, Null, Visible To and String, Default Visibility);
        Else If(Not(Global.CompMode));
            Create HUD Text(If-Then-Else((Local Player).K, Local Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("长按 {0} | 观战模式{1}", Input Binding String(Button(Interact)), If-Then-Else((Local Player).F, Custom String(" | 启用", Null, Null, Null), Custom String("", Null, Null, Null)), Null), Custom String("Hold {0} | Spectate{1}", Input Binding String(Button(Interact)), If-Then-Else((Local Player).F, Custom String(" | ON", Null, Null, Null), Custom String("", Null, Null, Null)), Null)), Right, -157, Null, Null, If-Then-Else((Local Player).F, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
            Create HUD Text(If-Then-Else((Local Player).K, Local Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("长按  {0} | 隐身模式{1}", Input Binding String(Button(Ability 2)), If-Then-Else((Local Player).invis, Custom String(" | 启用", Null, Null, Null), Custom String("", Null, Null, Null)), Null), Custom String("Hold {0} | invisible{1}", Input Binding String(Button(Ability 2)), If-Then-Else((Local Player).invis, Custom String(" | ON", Null, Null, Null), Custom String("", Null, Null, Null)), Null)), Right, -156, Null, Null, If-Then-Else((Local Player).invis, Color(Green), Color(White)), Visible To String and Color, Default Visibility);
            Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
            Create HUD Text(If-Then-Else((Local Player).K, Local Player, Null), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0} + {1} | 练习模式{2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Melee)), If-Then-Else((Local Player).PracticeToggle, Custom String(" | ({0})", (Local Player).PracticeCheckpoint, Null, Null), Custom String("", Null, Null, Null))), Custom String("{0} + {1} | Practice{2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Melee)), If-Then-Else((Local Player).PracticeToggle, Custom String(" | ({0})", (Local Player).PracticeCheckpoint, Null, Null), Custom String("", Null, Null, Null)))), Right, -151, Null, Null, If-Then-Else((Local Player).PracticeToggle, Color(Green), If-Then-Else((Local Player).C, Color(Gray), Color(White))), Visible To String and Color, Default Visibility);
            Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
            Create HUD Text(Filtered Array(All Players(All Teams), And((Current Array Element).PracticeToggle, (Current Array Element).K)), Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0} + {1} | 下一关\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | 上一关\n{2} | 回到练习模式起点 ", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Interact)))), Custom String("{0}  + {1} | Next level\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | Previous level\n{2} | Start from practice cp ", Input Binding String(Button(Crouch)), Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Interact))))), Null, Right, -150, Null, Color(Lime Green), Null, Visible To String and Color, Default Visibility);
            Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
        End;
        If(Not((Host Player).EditorOn));
            "find the value"
            Set Global Variable(Difficultyhud, Array(Workshop Setting Combo(Custom String("map settings \n地图设置", Null, Null, Null), Custom String("difficulty (display hud) - 难度(显示hud)", Null, Null, Null), ${difficultyhud}, Array(Custom String("playtest - 游戏测试", Null, Null, Null), Custom String("easy-", Null, Null, Null), Custom String("easy", Null, Null, Null), Custom String("easy+", Null, Null, Null), Custom String("medium-", Null, Null, Null), Custom String("medium", Null, Null, Null), Custom String("medium+", Null, Null, Null), Custom String("hard-", Null, Null, Null), Custom String("hard", Null, Null, Null), Custom String("hard+", Null, Null, Null), Custom String("very hard-", Null, Null, Null), Custom String("very hard", Null, Null, Null), Custom String("very hard+", Null, Null, Null), Custom String("extreme-", Null, Null, Null), Custom String("extreme", Null, Null, Null), Custom String("extreme+", Null, Null, Null), Custom String("hell", Null, Null, Null), Custom String("don't display - 不显示", Null, Null, Null)), 0), Workshop Setting Toggle(Custom String("map settings \n地图设置", Null, Null, Null), Custom String("Playtest display - 游戏测试", Null, Null, Null), ${playteston}, 0)));
            "display\r\n 17th entry is 'dont display'"
            If(Compare(First Of(Global.Difficultyhud), !=, 17));
                Create HUD Text(If-Then-Else(And((Local Player).K, Not((Local Player).LeaderboardToggle)), Local Player, Null), If-Then-Else(Value In Array(Global.Difficultyhud, 1), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("游戏测试", Null, Null, Null), Custom String("Playtest", Null, Null, Null)), Custom String("", Null, Null, Null)), Value In Array(Array(Custom String("playtest", Null, Null, Null), Custom String("easy -", Null, Null, Null), Custom String("easy", Null, Null, Null), Custom String("easy +", Null, Null, Null), Custom String("medium -", Null, Null, Null), Custom String("medium", Null, Null, Null), Custom String("medium +", Null, Null, Null), Custom String("hard -", Null, Null, Null), Custom String("hard", Null, Null, Null), Custom String("hard +", Null, Null, Null), Custom String("very hard -", Null, Null, Null), Custom String("very hard", Null, Null, Null), Custom String("very hard +", Null, Null, Null), Custom String("extreme -", Null, Null, Null), Custom String("extreme", Null, Null, Null), Custom String("extreme +", Null, Null, Null), Custom String("hell", Null, Null, Null), Null), First Of(Global.Difficultyhud)), Null, Top, -174, Color(Blue), Value In Array(Array(Color(Blue), Color(Lime Green), Color(Lime Green), Color(Lime Green), Color(Yellow), Color(Yellow), Color(Yellow), Color(Orange), Color(Orange), Color(Orange), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Color(Red), Color(Red), Color(Red), Custom Color(150, 0, 0, 255), Null), First Of(Global.Difficultyhud)), Color(Blue), Visible To and String, Default Visibility);
                Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
    }
}

rule ("Huds: each player") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    actions {
        Wait(0.5, Ignore Condition);
        Abort If(And(Is Dummy Bot(Event Player), Compare(Hero Of(Event Player), ==, Hero(D.Va))));
        "ban icons in level"
        Create HUD Text(Event Player, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else((Event Player).PracticeToggle, Custom String("练习用时 {0}", Custom String("{0} {1}", (Event Player).practicetimer, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("秒", Null, Null, Null), Custom String("sec", Null, Null, Null)), Null), Null, Null), Custom String("", Null, Null, Null)), If-Then-Else((Event Player).PracticeToggle, Custom String("Practice Time {0}", Custom String("{0} {1}", (Event Player).practicetimer, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("秒", Null, Null, Null), Custom String("sec", Null, Null, Null)), Null), Null, Null), Custom String("", Null, Null, Null))), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("用时 {0}", Custom String("{0} {1}", (Event Player).D, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("秒", Null, Null, Null), Custom String("sec", Null, Null, Null)), Null), Null, Null), Custom String("Time {0}", Custom String("{0} {1}", (Event Player).D, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("秒", Null, Null, Null), Custom String("sec", Null, Null, Null)), Null), Null, Null)), Left, -196, Color(White), Color(Gray), Color(White), String, Default Visibility);
        Create HUD Text(If-Then-Else((Event Player).LeaderboardToggle, Null, Event Player), Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else((Event Player).BounceLockMax_Cache, Custom String("黄弹球 {0} / {1}", Count Of((Event Player).LockCollected), (Event Player).BounceLockMax_Cache, Null), Custom String("", Null, Null, Null)), If-Then-Else((Event Player).BounceLockMax_Cache, Custom String("orange orbs {0} / {1}", Count Of((Event Player).LockCollected), (Event Player).BounceLockMax_Cache, Null), Custom String("", Null, Null, Null))), Custom String("{0}{1}{2}", If-Then-Else((Event Player).banstring, (Event Player).banstring, Custom String("", Null, Null, Null)), If-Then-Else((Event Player).banstring, Custom String("\n", Null, Null, Null), Custom String("", Null, Null, Null)), Custom String("{0} {1} / {2}", If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("检查点", Null, Null, Null), Custom String("Level", Null, Null, Null)), (Event Player).A, Subtract(Count Of(Global.A), 1))), Top, -173, Color(White), Color(Orange), Color(White), Visible To and String, Default Visibility);
        "climb/bhop indicators"
        Create HUD Text(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0}{1}", If-Then-Else((Event Player).J, Custom String("爬墙已用", Null, Null, Null), Custom String("爬墙未用", Null, Null, Null)), If-Then-Else(Compare((Event Player).climbNum, <, 1), Custom String("", Null, Null, Null), Custom String(" ({0})", (Event Player).climbNum, Null, Null)), Null), Custom String("Climb{0}", If-Then-Else(Compare((Event Player).climbNum, <, 1), Custom String("", Null, Null, Null), Custom String(" ({0})", (Event Player).climbNum, Null, Null)), Null, Null)), Null, Null, Left, -193, If-Then-Else((Event Player).J, Color(Red), Color(Green)), Null, Null, String and Color, Default Visibility);
        Create HUD Text(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("{0}{1}", If-Then-Else(Or(Compare((Event Player).O, ==, 0), Compare((Event Player).CH, ==, Color(Green))), Custom String("小跳未用", Null, Null, Null), Custom String("小跳已用", Null, Null, Null)), If-Then-Else(Compare((Event Player).CreateCounter, <, 1), Custom String("", Null, Null, Null), Custom String(" ({0})", (Event Player).CreateCounter, Null, Null)), Null), Custom String("Bhop{0}", If-Then-Else(Compare((Event Player).CreateCounter, <, 1), Custom String("", Null, Null, Null), Custom String(" ({0})", (Event Player).CreateCounter, Null, Null)), Null, Null)), Null, Null, Left, -194, If-Then-Else(Compare((Event Player).O, ==, 0), Color(Green), (Event Player).CH), Null, Null, String and Color, Default Visibility);
        Wait(2.5, Ignore Condition);
        If(Global.CompMode);
            Create HUD Text(Event Player, Custom String(" ", Null, Null, Null), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else(Compare(Global.CompTime, <=, 0), Custom String("! 比赛结束 !", Null, Null, Null), Custom String("剩余时间: {0} 分钟{1}", Global.CompTime, If-Then-Else(Compare((Event Player).AttemptCount, ==, -1), Custom String("\n你没有尝试过", Null, Null, Null), If-Then-Else(Compare(Global.CompAtmpNum, >, 0), Custom String("\n尝试 {0} / {1}", (Event Player).AttemptCount, Global.CompAtmpNum, Null), Custom String("", Null, Null, Null))), Null)), If-Then-Else(Compare(Global.CompTime, <=, 0), Custom String("! competition is over !", Null, Null, Null), Custom String("time left: {0} min{1}", Global.CompTime, If-Then-Else(Compare((Event Player).AttemptCount, ==, -1), Custom String("\nYou are out of attemps", Null, Null, Null), If-Then-Else(Compare(Global.CompAtmpNum, >, 0), Custom String("\nAttempt {0} / {1}", (Event Player).AttemptCount, Global.CompAtmpNum, Null), Custom String("", Null, Null, Null))), Null))), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else(Compare(Global.CompTime, >, 0), Custom String("竞赛模式", Null, Null, Null), Custom String("竞赛模式\n\n\n", Null, Null, Null)), If-Then-Else(Compare(Global.CompTime, >, 0), Custom String("competitive mode", Null, Null, Null), Custom String("competitive mode\n\n\n", Null, Null, Null))), Top, -183, Color(Yellow), Color(Yellow), Color(Yellow), String, Default Visibility);
    }
}

rule ("Huds: remake leaderboard") {
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
            Create HUD Text(All Players(All Teams), Null, Null, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String(" \n{0} 排名前5 {0}", Ability Icon String(Hero(Genji), Button(Primary Fire)), Null, Null), Custom String(" \n{0} Top 5 {0}", Ability Icon String(Hero(Genji), Button(Primary Fire)), Null, Null)), Right, -146, Null, Null, Color(White), Visible To and String, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(First Of(Global.LeaderBoardFull)), Value In Array(First Of(Global.LeaderBoardFull), 2), Right, -145, Color(Red), Color(Red), Color(Red), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 1));
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 1)), Value In Array(Value In Array(Global.LeaderBoardFull, 1), 2), Right, -144, Color(Orange), Color(Orange), Color(Orange), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 2));
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 2)), Value In Array(Value In Array(Global.LeaderBoardFull, 2), 2), Right, -143, Color(Yellow), Color(Yellow), Color(Yellow), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 3));
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 3)), Value In Array(Value In Array(Global.LeaderBoardFull, 3), 2), Right, -142, Color(Lime Green), Color(Lime Green), Color(Lime Green), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 4));
            Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Value In Array(Global.LeaderBoardFull, 4)), Value In Array(Value In Array(Global.LeaderBoardFull, 4), 2), Right, -141, Color(Green), Color(Green), Color(Green), Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　 {0} {1} {0} 　　　", Icon String(Flag), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("成绩排名", Null, Null, Null), Custom String("Leaderboard", Null, Null, Null)), Null), Null, Null, Top, -168, Color(Blue), Null, Null, Visible To and String, Visible Never);
        Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　　　　　　　　　　　　　　　\n　 1:　{0} - {1}　\n　 2:　{2}", If-Then-Else(First Of(Global.LeaderBoardFull), First Of(First Of(Global.LeaderBoardFull)), Custom String("", Null, Null, Null)), If-Then-Else(First Of(Global.LeaderBoardFull), Value In Array(First Of(Global.LeaderBoardFull), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 3:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 1), First Of(Value In Array(Global.LeaderBoardFull, 1)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 1), Value In Array(Value In Array(Global.LeaderBoardFull, 1), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 4:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 2), First Of(Value In Array(Global.LeaderBoardFull, 2)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 2), Value In Array(Value In Array(Global.LeaderBoardFull, 2), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 5:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 3), First Of(Value In Array(Global.LeaderBoardFull, 3)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 3), Value In Array(Value In Array(Global.LeaderBoardFull, 3), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 4), First Of(Value In Array(Global.LeaderBoardFull, 4)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 4), Value In Array(Value In Array(Global.LeaderBoardFull, 4), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -167, Color(White), Null, Null, Visible To, Default Visibility);
        Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        If(Value In Array(Global.LeaderBoardFull, 5));
            Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　　　　　　　　　　　　　　　\n　 6:　{0} - {1}　\n　 7:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 5), First Of(Value In Array(Global.LeaderBoardFull, 5)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 5), Value In Array(Value In Array(Global.LeaderBoardFull, 5), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 8:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 6), First Of(Value In Array(Global.LeaderBoardFull, 6)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 6), Value In Array(Value In Array(Global.LeaderBoardFull, 6), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　 9:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 7), First Of(Value In Array(Global.LeaderBoardFull, 7)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 7), Value In Array(Value In Array(Global.LeaderBoardFull, 7), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　10:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 8), First Of(Value In Array(Global.LeaderBoardFull, 8)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 8), Value In Array(Value In Array(Global.LeaderBoardFull, 8), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 9)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 9), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -166, Color(White), Null, Null, Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 10));
            Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　　　　　　　　　　　　　　　\n　11:　{0} - {1}　\n　12:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 10)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 10), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　13:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 11)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 11), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　14:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 12)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 12), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　15:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 13)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 13), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 14)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 14), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -165, Color(White), Null, Null, Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
        End;
        If(Value In Array(Global.LeaderBoardFull, 15));
            Create HUD Text(If-Then-Else(Evaluate Once(And(Global.CompMode, Compare(Global.CompTime, ==, 0))), All Players(All Teams), (Local Player).LeaderboardToggle), Custom String("　　　　　　　　　　　　　　　　　　\n　16:　{0} - {1}　\n　17:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 15)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 15), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　18:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 16)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 16), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　19:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 17)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 17), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}　\n　20:　{2}", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 18)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 18), 2), Custom String("", Null, Null, Null)), Custom String("{0} - {1}\n", If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), First Of(Value In Array(Global.LeaderBoardFull, 19)), Custom String("", Null, Null, Null)), If-Then-Else(Value In Array(Global.LeaderBoardFull, 9), Value In Array(Value In Array(Global.LeaderBoardFull, 19), 2), Custom String("", Null, Null, Null)), Null))))), Null, Null, Top, -164, Color(White), Null, Null, Visible To, Default Visibility);
            Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
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

rule ("Split hide") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Ability 1)) == True;
        Is Button Held(Event Player, Button(Primary Fire)) == True;
        Is Button Held(Event Player, Button(Secondary Fire)) == True;
    }
    actions {
        Wait(1, Abort When False);
        Set Player Variable(Event Player, splitdisplay, If-Then-Else(Compare((Event Player).splitdisplay, ==, -999), 0, -999));
        Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
        Wait(0.016, Ignore Condition);
        Small Message(Event Player, If-Then-Else(Compare((Event Player).splitdisplay, ==, -999), Custom String("   split display off", Null, Null, Null), Custom String("   split display on", Null, Null, Null)));
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
        Small Message(Event Player, Custom String("   {0} {1}", If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("隐身模式", Null, Null, Null), Custom String("Invisible", Null, Null, Null)), If-Then-Else((Event Player).invis, Custom String("on", Null, Null, Null), Custom String("off", Null, Null, Null)), Null));
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
        (Event Player).LockState == False;
    }
    actions {
        Wait(0.9, Abort When False);
        "prevent preview empty bug"
        Set Player Variable(Event Player, PreviewsArray, Empty Array);
        If(Compare(Count Of(Global.CustomPortalStart), >, 0));
            Set Player Variable(Event Player, PreviewsArray, Filtered Array(Global.CustomPortalStart, Compare(Value In Array(Global.CustomPortalCP, Index Of Array Value(Global.CustomPortalStart, Current Array Element)), ==, (Event Player).A)));
        End;
        Modify Player Variable(Event Player, PreviewsArray, Append To Array, Filtered Array(Global.TQ, And(Compare(Value In Array(Global.pinballnumber, Index Of Array Value(Global.TQ, Current Array Element)), ==, (Event Player).A), Compare(Value In Array(Global.BounceToggleLock, Index Of Array Value(Global.TQ, Current Array Element)), ==, True))));
        Abort If(Or(Or(Compare(Count Of((Event Player).PreviewsArray), <, 1), Compare((Event Player).PreviewsArray, ==, Null)), Not((Event Player).NotOnLastCp)));
        Wait(0.1, Ignore Condition);
        Set Move Speed(Event Player, 0);
        Set Player Variable(Event Player, PreviewsI, 0);
        Start Camera(Event Player, Add(Value In Array((Event Player).PreviewsArray, (Event Player).PreviewsI), Multiply(Facing Direction Of(Event Player), -3.5)), Value In Array((Event Player).PreviewsArray, (Event Player).PreviewsI), 15);
        While(And(And(Is Button Held(Event Player, Button(Primary Fire)), Is Alive(Event Player)), Not((Event Player).LockState)));
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
        "@Condition not eventPlayer.isUsingAbility1()"
        Set Player Variable(Event Player, LockState, True);
        "prevent 0.02 time bug with next 2 checks"
        If(And(Compare((Event Player).A, ==, Subtract(Count Of(Global.A), 2)), Compare(Altitude Of(Event Player), <, 3)));
            Wait Until(Is On Ground(Event Player), 3);
            "0.64"
            Wait(0.42, Ignore Condition);
        End;
        If(Compare((Event Player).A, ==, Subtract(Count Of(Global.A), 1)));
            Wait(0.42, Ignore Condition);
        End;
        If(Global.CompMode);
            Wait(0.016, Ignore Condition);
            If(Compare(Global.CompTime, <, 1));
                Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   比赛结束", Null, Null, Null), Custom String("   The competition is over", Null, Null, Null)));
                Set Player Variable(Event Player, LockState, False);
                Abort;
            Else If((Event Player).CompDone);
                Set Player Variable(Event Player, LockState, False);
                Abort;
            Else If(And(Global.CompRestartLimit, (Event Player).NotOnLastCp));
                Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   禁止在此比赛中运行期间重新启动", Null, Null, Null), Custom String("   Restart during run is disabled for this competition", Null, Null, Null)));
                Set Player Variable(Event Player, LockState, False);
                Abort;
            Else If(Compare(Global.CompAtmpNum, >, 0));
                If(Compare((Event Player).AttemptCount, ==, Global.CompAtmpNum));
                    Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   最后一次尝试", Null, Null, Null), Custom String("   You are on your last attempt", Null, Null, Null)));
                    Set Player Variable(Event Player, LockState, False);
                    Abort;
                End;
                If(Compare((Event Player).AttemptCount, ==, -1));
                    Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   你没有尝试过", Null, Null, Null), Custom String("   You are out of attempts", Null, Null, Null)));
                    Set Player Variable(Event Player, LockState, False);
                    Abort;
                End;
                Modify Player Variable(Event Player, AttemptCount, Add, 1);
                Set Global Variable At Index(CompAtmpSaveCount, Index Of Array Value(Global.CompAtmpSaveNames, Custom String("{0}", Event Player, Null, Null)), (Event Player).AttemptCount);
            End;
        End;
        Set Player Variable(Event Player, flytoggle, Null);
        Set Player Variable(Event Player, A, 0);
        Set Player Variable(Event Player, PracticeToggle, False);
        Set Player Variable(Event Player, PracticeCheckpoint, 0);
        Set Player Variable(Event Player, C, False);
        Stop Chasing Player Variable(Event Player, practicetimer);
        Set Player Variable(Event Player, practicetimer, 0);
        Set Player Variable(Event Player, splitdisplay, If-Then-Else(Compare((Event Player).splitdisplay, ==, -999), -999, 0));
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
        And((Event Player).EditorOn, Is Button Held(Event Player, Button(Melee))) == False;
        Global.CompMode == False;
    }
    actions {
        Wait(1, Abort When False);
        "editor has interact combos"
        If((Event Player).EditorOn);
            Wait(1, Abort When False);
        End;
        Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   再次长按互动键关闭观战模式", Null, Null, Null), Custom String("   Hold Interact again to turn off spectate mode", Null, Null, Null)));
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

rule ("Toggle Invincible Mode | Melee + Reload") {
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
        (Event Player).LockState == False;
    }
    actions {
        Set Player Variable(Event Player, LockCollected, Empty Array);
        Set Player Variable(Event Player, flytoggle, Null);
        If(And(Compare((Event Player).A, >, 0), Not((Event Player).NotOnLastCp)));
            Disallow Button(Event Player, Button(Ability 1));
            If(Is Using Ability 1(Event Player));
                Wait Until(Not(Is Using Ability 1(Event Player)), 1.5);
                Wait(0.016, Ignore Condition);
            End;
        End;
        If((Event Player).C);
            Start Forcing Player Position(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)), True);
            Teleport(Event Player, Last Of(Value In Array(Global.A, (Event Player).A)));
            Wait(0.16, Ignore Condition);
            If((Event Player).PracticeToggle);
                Big Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("练习模式", Null, Null, Null), Custom String("Practice mode", Null, Null, Null)));
                Chase Player Variable At Rate(Event Player, practicetimer, 9999999, 1, None);
            Else;
                Big Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("跑图模式", Null, Null, Null), Custom String("Normal mode", Null, Null, Null)));
                Chase Player Variable At Rate(Event Player, D, 9999999, 1, None);
                Call Subroutine(StopPauseTimer);
            End;
            Stop Forcing Player Position(Event Player);
            Set Player Variable(Event Player, flytoggle, Null);
        Else;
            If(Not((Event Player).NotOnLastCp));
                Allow Button(Event Player, Button(Ability 1));
                Wait(0.016, Ignore Condition);
                Abort;
            End;
            Call Subroutine(StartPauseTimer);
            Stop Chasing Player Variable(Event Player, D);
            Stop Chasing Player Variable(Event Player, practicetimer);
            Big Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("探点模式", Null, Null, Null), Custom String("Invincible mode", Null, Null, Null)));
            Set Player Variable(Event Player, flytoggle, Null);
            Wait(0.2, Ignore Condition);
        End;
        Set Player Variable(Event Player, C, Not((Event Player).C));
        Start Rule(CheckUlt, Restart Rule);
        Start Rule(CheckDash, Restart Rule);
        "cp 0 start dash ban is via startgame sub because it has to give msg"
        If(Compare((Event Player).A, >, 0));
            Allow Button(Event Player, Button(Ability 1));
            Wait(0.16, Ignore Condition);
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
            Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   探点模式下无法切换练习模式", Null, Null, Null), Custom String("   Cannot toggle practice mode while in invincible", Null, Null, Null)));
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
            Big Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("跑图模式", Null, Null, Null), Custom String("Normal mode", Null, Null, Null)));
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
            Big Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("练习模式", Null, Null, Null), Custom String("Practice mode", Null, Null, Null)));
            Stop Forcing Player Position(Event Player);
            If((Event Player).NotOnLastCp);
                Call Subroutine(StartPauseTimer);
            End;
            Set Player Variable(Event Player, splitdisplay, If-Then-Else(Compare((Event Player).splitdisplay, ==, -999), -999, 0));
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
        "@Condition hostPlayer.EditorOn or ( eventPlayer.PracticeToggle and eventPlayer.isHoldingButton(Button.ABILITY_1) )"
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

rule ("Quick Reset | Reload, Hold Reload to Enable") {
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
            "dont go to 0,0,0 if no cps on map"
            If(Compare(Global.A, ==, Empty Array));
                Wait(0.016, Ignore Condition);
                Abort;
            End;
            If((Event Player).EditorOn);
                If(And(And(Compare(Event Player, ==, Host Player), Compare((Event Player).E, ==, 0)), Is Button Held(Event Player, Button(Interact))));
                    "wait(0.1, Wait.ABORT_WHEN_FALSE)"
                    Wait(0.2, Ignore Condition);
                End;
            End;
            Set Player Variable(Event Player, splittime, If-Then-Else((Event Player).PracticeToggle, (Event Player).practicetimer, (Event Player).D));
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
            If(And(Compare((Event Player).A, ==, 0), Not((Event Player).PracticeToggle)));
                Set Player Variable(Event Player, D, 0);
                Set Player Variable(Event Player, splittime, 0);
            End;
            Set Player Variable(Event Player, flytoggle, Null);
            Wait(0.24, Ignore Condition);
        End;
        Wait(1, Abort When False);
        Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
        Set Player Variable(Event Player, quick_restart, Not((Event Player).quick_restart));
        Big Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else((Event Player).quick_restart, Custom String("快速回点已启用", Null, Null, Null), Custom String("快速回点已关闭", Null, Null, Null)), If-Then-Else((Event Player).quick_restart, Custom String("Quick reset is enabled", Null, Null, Null), Custom String("Quick reset is disabled", Null, Null, Null))));
    }
}

rule ("Toggle Hud | hold secondary") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Secondary Fire)) == True;
        "don't trigger during skiping"
        And(Is Button Held(Event Player, Button(Crouch)), Is Button Held(Event Player, Button(Ability 1))) == False;
        First Of(Event Player) != False;
    }
    actions {
        Wait(1.5, Abort When False);
        Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
        Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), If-Then-Else((Event Player).K, Custom String("   HUD已开启", Null, Null, Null), Custom String("HUD已隐藏", Null, Null, Null)), If-Then-Else((Event Player).K, Custom String("   Hud is now open", Null, Null, Null), Custom String("   Hud is now hidden", Null, Null, Null))));
        Set Player Variable(Event Player, K, Not((Event Player).K));
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
        If((Event Player).LockState);
            "for dash start etc you can be away from cp so the keep charge triggers"
            Set Ultimate Charge(Event Player, 0);
        End;
        Wait Until(Not(Is Using Ultimate(Event Player)), 2);
        If(Or((Event Player).C, Not((Event Player).NotOnLastCp)));
            "skip msg if these"
            Skip(2);
        Else If(And(Array Contains(Global.Dao, (Event Player).A), Compare(Distance Between(Event Player, Last Of(Value In Array(Global.A, (Event Player).A))), <=, 1.4)));
            Small Message(Event Player, Custom String("   {0} {1} ", Ability Icon String(Hero(Genji), Button(Ultimate)), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("终极技能已就绪", Null, Null, Null), Custom String("Ultimate is ready", Null, Null, Null)), Null));
            Wait(0.016, Ignore Condition);
            Set Ultimate Ability Enabled(Event Player, True);
            Set Ultimate Charge(Event Player, 100);
        Else If((Event Player).EditorOn);
            Wait(0.016, Ignore Condition);
            Set Ultimate Ability Enabled(Event Player, True);
            Set Ultimate Charge(Event Player, 100);
        "used to be just else, but have to deal with multi ult orbs"
        Else If(Or(Compare(Distance Between(Event Player, Last Of(Value In Array(Global.A, (Event Player).A))), <=, 2), Compare(Ultimate Charge Percent(Event Player), <, 100)));
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
            Small Message(Event Player, Custom String("   {0} {1}", Ability Icon String(Hero(Genji), Button(Ability 1)), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("技能1影已就绪", Null, Null, Null), Custom String("Dash is ready", Null, Null, Null)), Null));
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
        Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   小跳已用", Null, Null, Null), Custom String("   Bhop", Null, Null, Null)));
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
        "prevent restart from giving messsage, but stil alow it to become green"
        Abort If((Event Player).LockState);
        If(And(And((Event Player).ban_create, Compare((Event Player).C, ==, False)), Compare((Event Player).A, <, Subtract(Count Of(Global.A), 1))));
            Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   卡小 ♂ 已禁用!", Null, Null, Null), Custom String("   Create Bhop ♂ is banned!", Null, Null, Null)));
            Call Subroutine(checkpointFailReset);
            Abort;
        End;
        Modify Player Variable(Event Player, CreateCounter, Add, 1);
        Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   succes!", Null, Null, Null), Custom String("   Bhop has been created!", Null, Null, Null)));
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
        Set Player Variable(Event Player, CreateCounter, 0);
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
        If(And(And((Event Player).ban_multi, (Event Player).NotOnLastCp), Not((Event Player).C)));
            Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("    蹭留 ∞ 已禁用!", Null, Null, Null), Custom String("   Multiclimb ∞ is banned!", Null, Null, Null)));
            Call Subroutine(checkpointFailReset);
        Else;
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

rule ("Ban | Wallclimb - indicator ") {
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
        "checkpointFailReset()\r\neventPlayer.setStatusEffect(null,Status.BURNING, 0.1)"
        Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   爬墙 ↑ 已禁用!", Null, Null, Null), Custom String("   Climb ↑ is banned!", Null, Null, Null)));
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
        "legacy ban, only works when blizzards enables triple again. fake triple is baned via fake triple rule"
        Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   三段跳 ▲ 已禁用!", Null, Null, Null), Custom String("   Triple Jump ▲ is banned!", Null, Null, Null)));
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
        Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("   表情爬 ♥ 已禁用!", Null, Null, Null), Custom String("   Emote Savehop ♥ is banned!", Null, Null, Null)));
        Call Subroutine(checkpointFailReset);
    }
}

disabled rule ("------------------------------------------------------------------------ Addon functions  ------------------------------------------------------------------------") {
    event {
        Ongoing - Global;
    }
}

rule ("Pre-set control map portal | function | toggled via workshop") {
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

rule ("Custom portals | function") {
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

rule ("Pre-set control map portal | toggled on via workshop settings") {
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
        Else If(Compare(Current Map, ==, Map(Antarctic Peninsula)));
            Set Global Variable(PortalNames, Array(Custom String("labs", Null, Null, Null), Custom String("icebreaker", Null, Null, Null), Custom String("Sublevel", Null, Null, Null), Custom String("icebreaker", Null, Null, Null), Custom String("labs", Null, Null, Null), Custom String("Sublevel", Null, Null, Null)));
            Set Global Variable(PortalLoc, Array(Vector(280.66, -12.15, -223.65), Vector(273.27, 42.74, 198.15), Vector(266.58, 42.74, 198.17), Vector(-58.29, -154, 63.03), Vector(-58.36, -154, 56.47), Vector(287.08, -12.15, -223.59)));
            Set Global Variable(PortalDest, Array(Vector(270, 42.7, 190.44), Vector(284.07, -12.75, -216.15), Vector(-53.51, -154.5, 60.08), Vector(284.07, -12.75, -216.15), Vector(270, 42.7, 190.44), Vector(-53.51, -154.5, 60.08)));
        Else;
            Set Global Variable(PortalDest, Null);
            Set Global Variable(PortalLoc, Null);
            Set Global Variable(PortalNames, Null);
            Abort;
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
        "Multiple bots"
        Set Global Variable(MsDestructo, Empty Array);
        Wait Until(Is True For Any(All Players(All Teams), Has Spawned(Current Array Element)), 99999);
        If(True);
        Skip(Value In Array(Array(14, 0, 2, 4, 6, 8, 10, 12), Add(1, Index Of Array Value(Array(Map(Ilios), Map(Busan), Map(Lijiang Tower), Map(Nepal), Map(Oasis), Map(New Queen Street), Map(Antarctic Peninsula)), Current Map))));
        Set Global Variable(MapVectorArray, Array(Vector(322.988, 40, -37.732), Vector(27.711, 100, -161.298), Vector(-223.895, 50, 0.89)));
        Else;
        Set Global Variable(MapVectorArray, Array(Vector(51.885, 37.172, -113.654), Vector(-329.934, 56.136, 149.839), Vector(227.21, 43.353, 252.64)));
        Else;
        Set Global Variable(MapVectorArray, Array(Vector(-5.808, 324.398, 282.523), Vector(-0.414, 156.197, 148.681), Vector(-0.381, 53.736, -33.335)));
        Else;
        Set Global Variable(MapVectorArray, Array(Vector(83.1, 178.926, 0.593), Vector(-49.803, 63.29, -0.413), Vector(-184.659, -38.73, -0.783)));
        Else;
        Set Global Variable(MapVectorArray, Array(Vector(150.125, 30.619, 251.966), Vector(134.888, 36.76, -240.736), Vector(-195.549, 60.35, -0.098)));
        Else;
        Set Global Variable(MapVectorArray, Array(Vector(-13.79, 1.96, 15.92), Vector(0, 35, 25), Vector(0, 8, 23.77), Vector(13.28, 2, 15)));
        Else;
        Set Global Variable(MapVectorArray, Array(Vector(-86, -110, 59), Vector(277, 132, 170), Vector(283, 57, -235)));
        Else;
        "lunar new year catch"
        If(String Contains(Custom String("{0}", Current Map, Null, Null), Custom String("{0}", Map(Lijiang Tower), Null, Null)));
            Set Global Variable(MapVectorArray, Array(Vector(-5.808, 324.398, 282.523), Vector(-0.414, 156.197, 148.681), Vector(-0.381, 53.736, -33.335)));
        "lunar new year catch"
        Else If(String Contains(Custom String("{0}", Current Map, Null, Null), Custom String("{0}", Map(Busan), Null, Null)));
            Set Global Variable(MapVectorArray, Array(Vector(51.885, 37.172, -113.654), Vector(-329.934, 56.136, 149.839), Vector(227.21, 43.353, 252.64)));
        "This default covers almost every map"
        Else;
            Set Global Variable(MapVectorArray, Array(Vector(73, 62, -17), Vector(169, 62, 82), Vector(-23, 62, -124), Vector(-23, 62, 100)));
        End;
        Else;
        End;
        For Global Variable(DestructoIter, 0, Count Of(Global.MapVectorArray), 1);
            Create Dummy Bot(Hero(D.Va), Team Of(First Of(Filtered Array(All Players(All Teams), And(Has Spawned(Current Array Element), Not(Is Dummy Bot(Current Array Element)))))), Subtract(20, Evaluate Once(Global.DestructoIter)), Evaluate Once(Value In Array(Global.MapVectorArray, Evaluate Once(Global.DestructoIter))), Vector(0, 0, 0));
            Set Global Variable At Index(MsDestructo, Evaluate Once(Global.DestructoIter), Last Created Entity);
            Start Scaling Player(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter)), 20, True);
            Wait(0.016, Ignore Condition);
            Set Gravity(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter)), 0);
            Apply Impulse(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter)), Up, 1, To Player, Cancel Contrary Motion XYZ);
            Teleport(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter)), Evaluate Once(Value In Array(Global.MapVectorArray, Evaluate Once(Global.DestructoIter))));
            Wait(1, Ignore Condition);
            Disable Movement Collision With Environment(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter)), True);
            Wait(0.016, Ignore Condition);
            Set Ultimate Ability Enabled(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter)), True);
            Wait(0.016, Ignore Condition);
            Set Ultimate Charge(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter)), 100);
            Wait(0.016, Ignore Condition);
        End;
        Wait(1, Ignore Condition);
        For Global Variable(DestructoIter, 0, Count Of(Global.MapVectorArray), 1);
            Start Holding Button(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter)), Button(Ultimate));
        End;
        Wait(5, Ignore Condition);
        For Global Variable(DestructoIter, 0, Count Of(Global.MapVectorArray), 1);
            Destroy Dummy Bot(Team Of(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter))), Slot Of(Value In Array(Global.MsDestructo, Evaluate Once(Global.DestructoIter))));
        End;
        "Remove MsDestructo data when done"
        Set Global Variable(MapVectorArray, Null);
        Set Global Variable(DestructoIter, Null);
        Set Global Variable(MsDestructo, Null);
    }
}

disabled rule ("------------------------------------------------------------------------  filler rules ------------------------------------------------------------------------ ") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

rule ("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页") {
    event {
        Ongoing - Global;
    }
}

disabled rule ("------------------------------------------------------------------------ MAP DATA - 地图数据 ------------------------------------------------------------------------") {
    event {
        Ongoing - Global;
    }
}

rule ("Map Data - 数据录入 <---- INSERT HERE / 在这输入") {
    event {
        Ongoing - Global;
    }
    actions
	{
		"credits"
		${mapcredits}
		${ultarray}
		${dasharray}


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

rule ("Credits here - 作者名字 <---- INSERT HERE / 在这输入 ") {
    event {
        Ongoing - Global;
    }
    actions {
        "Filling this in adds it to the inspector pasta after next restart.\r\n You can fill in again to overwrite.\r\n 填充此字段 将其添加到 检查器数据 面中\r\n 您可以再次 填写以覆盖 之前的条目"
        Set Global Variable(Name, Custom String("name here - 作者", Null, Null, Null));
        Set Global Variable(Code, Custom String("code here - 代码", Null, Null, Null));
    }
}

rule ("Ban per CP - 封禁(每级) <---- INSERT HERE / 在这输入") {
    event {
        Ongoing - Global;
    }
    actions {
        "Enter the checkpoint/level numbers in the lists below to apply the ban on them\r\n Remember the workshop toggle overwrites this list\r\n 在下面的列 表中输入检 查点 / 级别编号，封禁 掉对其应用\r\n 记住，工作坊切换 将覆盖 此列表"
        Wait(1, Ignore Condition);
        "======================\r\n ban  triple - 三段跳"
		Global.BanTriple = Array(${cpbantriple});
		"ban  multi - 蹭留"
		Global.BanMulti = Array(${cpbanmulti});
		"ban create - 卡小"
		Global.BanCreate = Array(${cpbancreate});
		"ban dedhop - 死小"
		Global.BanDead = Array(${cpbandead});
		"ban emote - 表情爬"
		Global.BanEmote = Array(${cpbanemote});
		"ban climb - 爬墙"
		Global.BanClimb = Array(${cpclimb});
		"require bhop available - 留小跳进点"
		Global.BanBhop = Array(${cprequirebhop});
    }
}

${customdifenabled}rule ("Custom difficulty hud  - 自定义难度hud <---- INSERT HERE / 在这输入") {
    event {
        Ongoing - Global;
    }
    actions {
        "1) workshop settings > difficulty > set to \"dont display\"\r\n2) enable this rule\r\n3) type your difficulty in the hud below"
        Wait(2.5, Ignore Condition);
																																	
																	  
        "1) 设置正常 难度hud为“不显示”\r\n2) 启用此规则\r\n3) 在下面的hud中输入难度"
        Create HUD Text(All Players(All Teams), If-Then-Else(Value In Array(Global.Difficultyhud, 1), If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("游戏测试", Null, Null, Null), Custom String("Playtest", Null, Null, Null)), Custom String("", Null, Null, Null)), Custom String("${customdiftxt}", Null, Null, Null), Null, Top, -174, Color(Blue), Color(${customdifcolor}), Color(Blue), Visible To and String, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
    }
}

rule ("Comp Mode instruction message - 竞赛模式指引消息 <---- INSERT HERE / 在这输入") {
    event {
        Ongoing - Global;
    }
    actions {
        Wait(0.4, Ignore Condition);
        "Instructions that show when you start comp mode.\r\n Due to the hud text limit, you there is 4 huds available.\r\n If you dont need a field just empty the textfield."
        Log To Inspector(Custom String("--------", Null, Null, Null));
        "竞赛模式 指引消息\r\n 指引消息将 会在竞赛模 式开始时 显示\r\n 由于 hud 文本限制，你有 4 个hud可用\r\n 如果你不需 要一个字段 只是空文 本字段"
	    Global.instructiontext[0] = Custom String("${compdescription[0]}");
		Global.instructiontext[1] = Custom String("${compdescription[1]}");
		Global.instructiontext[2] = Custom String("${compdescription[2]}");
		Global.instructiontext[3] = Custom String("${compdescription[3]}");
    }
}

disabled rule ("------------------------------------------------------------------------ Addons Settings and data - 附加组件 ------------------------------------------------------------------------") {
    event {
        Ongoing - Global;
    }
}

${titleon}rule("Title Data - 标题数据 <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"enable this rule and fill in the title data below.\r\n 启用此规则 并填写下面 的标题数据"
		Wait(1, Ignore Condition);
		"checkpoint number \r\n 每关数量"
		${titlecps}
		"title \r\n 标题文本"
		${titlenames}
		"color\r\n 颜色"
		${titlecolors}
	}
}

disabled rule ("Friend Title - 朋友称号 <---- DISPLAY MESSAGE HERE (ON PLAYER)") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Has Spawned(Event Player) == True;
    }
    actions {
        "\"your nickname\" your friends ingame name\r\n \"display title\" fill in the custom title\r\n \"your nickname\" 填入球员 的名字 \r\n \"display title\" 习俗标题"
        If(Compare(Custom String("your nickname <-------", Null, Null, Null), ==, Custom String("{0}", Event Player, Null, Null)));
            Big Message(All Players(All Teams), Custom String("Message to the whole room", Null, Null, Null));
            Create In-World Text(All Players(All Teams), Custom String("display title", Null, Null, Null), Event Player, 1.5, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
        End;
        If(Compare(Custom String("your nickname <-------", Null, Null, Null), ==, Custom String("{0}", Event Player, Null, Null)));
            Big Message(All Players(All Teams), Custom String("Message to the whole room", Null, Null, Null));
            Create In-World Text(All Players(All Teams), Custom String("display title", Null, Null, Null), Event Player, 1.5, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
        End;
        If(Compare(Custom String("your nickname <-------", Null, Null, Null), ==, Custom String("{0}", Event Player, Null, Null)));
            Big Message(All Players(All Teams), Custom String("Message to the whole room", Null, Null, Null));
            Create In-World Text(All Players(All Teams), Custom String("display title", Null, Null, Null), Event Player, 1.5, Clip Against Surfaces, Visible To Position and String, Color(Orange), Default Visibility);
    }
}

disabled rule ("Display World Record - 展示世界纪录 <---- EDIT ME / 在此处编辑") {
    event {
        Ongoing - Global;
    }
    actions {
        "type your entry in the textfield that says \"name and time here\"\r\n 在文本框 中输入“名称和时间”"
        Create HUD Text(All Players(All Teams), Null, Custom String(" \n{0} world record {0}", Icon String(Fire), Null, Null), Custom String("name and time here", Null, Null, Null), Right, -147, Color(Rose), Color(Rose), Color(Rose), Visible To, Default Visibility);
        Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
    }
}

${hudeanbled}rule ("HUD text for certain Checkpoints - 某些检查点的HUD文本 <---- EDIT ME / 在此处编辑") {
    event {
        Ongoing - Global;
    }
    actions {
        "the example fill shows a text for cp 1 and cp 3\r\n 示例填充 显示了cp 1和cp 3的文本"
        Wait(1, Ignore Condition);
        "in CpHudText fill in text\r\n 在 “CpHudText” 中填写文本"
        ${hudtext}
        "in CpHudCp fill in the at wich to display\r\n 在 “CpHudCp” 中填写要显 示的位置"
        ${hudcps}
    }
}

${iwtenabled}rule ("Inworld text for certain Checkpoints - 在世界文本中为某些检查点 <---- EDIT ME / 在此处编辑") {
    event {
        Ongoing - Global;
    }
    actions {
        "the example fill shows a text for cp 1 and cp 3\r\n 示例填充 显示了cp 1和cp 3的文本"
        Wait(1, Ignore Condition);
        "in CpIwtText fill in text \r\n 在 “CpIwtText” 中填写文本"
        ${iwttext}
        "in CpIwtCp fill in cp at wich to display\r\n 在 “CpIwtCp” 中填写 要显示的cp"
        ${iwtcps}
        "in CpIwtPos fill in the vector \r\n 在 “CpIwtPos” 中填充向量"
        ${iwtpos}
        "color applies to all \r\n 色彩运 用于全部"
        ${iwtcolor}
    }
}

disabled rule ("Custom portals data - 自定义传送门数据  <---- EDIT ME / 在此处编辑") {
    event {
        Ongoing - Global;
    }
    actions {
        "warning: This can cause you to exceed global orb/portal limit. \r\nmake sure portal + orbs do not go past the limit.\r\n请先确保传 送门+球体 总数不会超 过可添加数 量上限."
        Wait(1, Ignore Condition);
        "Portal start position\r\n传送门起点 位置"
        Set Global Variable(CustomPortalStart, Array(Vector(0, 0, 0)));
        "Portal end position (on same number as start position)\r\n传送门终点 位置 (顺序与传 送门起点位 置保持一致)"
        Set Global Variable(CustomPortalEndpoint, Array(Vector(0, 10, 0)));
        "Portal checkpoint (on same number as start position) \r\n999 = apply portal to entire map\r\n启用传送门 检查点 (顺序与传 送门起点位 置保持一致) \r\n999 = 传送门在全 部检查点启用"
        Set Global Variable(CustomPortalCP, Array(999));
    }
}

disabled rule ("------------------------------------------------------------------------ Addons skills - 附加组件技能 ------------------------------------------------------------------------") {
    event {
        Ongoing - Global;
    }
}

disabled rule ("Dash/Blade | DEPRICATED, instructions inside - 刀/Shift | 已弃用, 内含指引") {
    event {
        Ongoing - Global;
    }
    actions {
        "-\r\n >>> this rule should no longer be used <<<\r\n >>> 这条规则本版本已弃用 <<<\r\n -"
        Log To Inspector(Custom String("----------------", Null, Null, Null));
        "you can add ult/dash via checkpoint mode in the ingame editor\r\n existing map data should be updated to include this in map data\r\n Paste the blade and ult variable from the dash/ult rules old into the map pasta rule."
        Log To Inspector(Custom String("----------------", Null, Null, Null));
        "可通过游戏 内编辑器在 检查点模式 下添加刀 / Shift\r\n 过去的地图 数据需 要更新，以便在 地图 数据包含刀 / Shift 数据"
        Log To Inspector(Custom String("----------------", Null, Null, Null));
    }
}

${faketripleon}rule ("Fake Triple Jump - enable rule - 启用此规则 - 假三级跳") {
    event {
        Ongoing - Each Player;
        All;
        Genji;
    }
    conditions {
        "check starts in air when not double jumping, this is to detect double jumping"
        Is On Ground(Event Player) == False;
        "false when double jumping"
        Is Jumping(Event Player) == True;
        "prevent rest of code from runing if you are not gona be close to ground"
        Altitude Of(Event Player) < 0.5;
        "avoid trigering on start of jump, only when u go downwards"
        Vertical Speed Of(Event Player) < 0;
        "don't triger on reset"
        Is Button Held(Event Player, Button(Reload)) == False;
        Is Using Ability 1(Event Player) == False;
        Is On Wall(Event Player) == False;
    }
    actions {
        "if you double jump or climb etc before touching ground, reset"
        Wait Until(Or(Or(Or(Or(Is On Ground(Event Player), Not(Is Jumping(Event Player))), Is On Wall(Event Player)), Is Using Ability 1(Event Player)), Is Button Held(Event Player, Button(Reload))), 999);
        ""
        Abort If(Or(Or(Or(And(Not(Is On Ground(Event Player)), Not(Is Jumping(Event Player))), Is On Wall(Event Player)), Is Using Ability 1(Event Player)), Is Button Held(Event Player, Button(Reload))));
        "window on the ground were you can press jump"
        Wait Until(Or(Or(Or(And(Is Jumping(Event Player), Is Button Held(Event Player, Button(Jump))), Is On Wall(Event Player)), Is Using Ability 1(Event Player)), Is Button Held(Event Player, Button(Reload))), 0.048);
        Abort If(Or(Or(Or(Is On Wall(Event Player), Is Using Ability 1(Event Player)), Is Button Held(Event Player, Button(Reload))), Has Status(Event Player, Rooted)));
        If(And(Is Button Held(Event Player, Button(Jump)), Is Jumping(Event Player)));
            "handle bans and invincible"
            If(And(And((Event Player).ban_triple, Compare((Event Player).C, ==, False)), (Event Player).NotOnLastCp));
                Small Message(Event Player, If-Then-Else(Or(Compare(String("Capture", Null, Null, Null), ==, Custom String("捕捉", Null, Null, Null)), Compare(Custom String("{0}", Color(Rose), Null, Null), ==, Custom String("玫红", Null, Null, Null))), Custom String("  三段跳 ▲ 已禁用!", Null, Null, Null), Custom String("   Triple Jump ▲ is banned!", Null, Null, Null)));
                Abort;
            End;
            Apply Impulse(Event Player, Up, 9, To Player, Cancel Contrary Motion);
    }
}

disabled rule ("stall enhancer - 增强系統跳的判定 - 启用此规则") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Has Spawned(Event Player) == True;
        Vertical Speed Of(Event Player) >= -0.2;
        Vertical Speed Of(Event Player) <= 0.05;
        Horizontal Speed Of(Event Player) <= 1.3;
        Is In Air(Event Player) == True;
        Is On Wall(Event Player) == False;
        Is On Ground(Event Player) == False;
        And((Event Player).EditorOn, Compare((Event Player).flytoggle, !=, Null)) == False;
    }
    actions {
        "@Condition createWorkshopSetting(bool, \"map settings \\n地图设置\",\" Autobounce enhancer - 增强系統跳的判定\",false,3)"
        Wait(0.25, Abort When False);
        Start Forcing Player Position(Event Player, Position Of(Event Player), False);
        Wait Until(Not(Is Moving(Event Player)), 1);
        Stop Forcing Player Position(Event Player);
        Set Move Speed(Event Player, 0);
        Set Gravity(Event Player, 0);
        Wait Until(Or(Or(Or(Or(Is Button Held(Event Player, Button(Reload)), Compare((Event Player).flytoggle, !=, Null)), Is Dead(Event Player)), Is Using Ability 1(Event Player)), Compare(Speed Of(Event Player), >, 3)), 3);
        "wait(3)"
        Set Gravity(Event Player, 100);
        Set Move Speed(Event Player, 100);
        If(And(And(Compare((Event Player).flytoggle, ==, Null), Is Alive(Event Player)), Not(Is Button Held(Event Player, Button(Reload)))));
            Apply Impulse(Event Player, Up, 10, To World, Cancel Contrary Motion);
            Loop If Condition Is True;
    }
}

disabled rule ("Fake Ledge Dash - enable rule - 超级跳 - 启用此规则") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Using Ability 1(Event Player) == True;
    }
    actions {
        "climb / ledge > hold jump > hands on the ledge > dash  > wait for launch > release jump\r\n爬墙/扒 > 长按跳 > 抓住窗台 > SHIFT > 等待发射 > 释放跳跃"
        Set Player Variable At Index(Event Player, LedgeDash, 0, 0);
        Wait Until(Compare(Speed Of(Event Player), >=, 45), 0.4);
        While(And(Is Using Ability 1(Event Player), Compare(First Of((Event Player).LedgeDash), <=, 12)));
            Set Player Variable At Index(Event Player, LedgeDash, 1, Facing Direction Of(Event Player));
            Set Player Variable At Index(Event Player, LedgeDash, 2, Speed Of(Event Player));
            "dashed into air or object = end"
            If(Compare(Speed Of(Event Player), <, 45));
                Skip(11);
            Else;
                Modify Player Variable At Index(Event Player, LedgeDash, 0, Add, 1);
            End;
            "stop storing, we keep this speed/direction"
            If(Compare(First Of((Event Player).LedgeDash), ==, 12));
                "wait for dash to finish to execute"
                Wait Until(Compare(Speed Of(Event Player), <, 40), 0.4);
            End;
            Wait(0.016, Ignore Condition);
        End;
        "and eventPlayer.LedgeDash[0] <= 12: # ledge dash execute"
        If(Compare(First Of((Event Player).LedgeDash), >=, 5));
            Apply Impulse(Event Player, Value In Array((Event Player).LedgeDash, 1), Value In Array((Event Player).LedgeDash, 2), To World, Cancel Contrary Motion);
        End;
        Set Player Variable At Index(Event Player, LedgeDash, 0, Null);
        Set Player Variable At Index(Event Player, LedgeDash, 1, Null);
        Set Player Variable At Index(Event Player, LedgeDash, 2, Null);
    }
}


`
}


