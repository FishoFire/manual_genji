
document.getElementById("versiondisplayhere").innerHTML = "1.8.1"



function setdata(){ //String.raw
    data_pasta = String.raw`
settings
{
	main
	{
		Description: "  ~ The Official Genji Parkour Editor ~\nCode: 54CRY\nAdapted by: nebula#11571/FishoFire#2431"
		Mode Name: "Genji Parkour - 源氏跑酷 - v1.8.1"
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
				Workshop Chamber 0
			}
		}

		Team Deathmatch
		{
			Game Length In Minutes: 15
			Mercy Resurrect Counteracts Kills: Off
			Self Initiated Respawn: Off

			enabled maps
			{
			}
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

variables
{
	global:
		0: A
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
		32: LeaderBoardFull
		33: LeaderBoardHuds
		34: LeaderBoardRemake
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
		76: ban_emote
		77: ban_climb
		78: ban_bhop
		79: splittime
		80: splitdisplay
		82: practicetimer
		85: CH
}

subroutines
{
	0: Leaderboardupdate
	1: Sub1
	2: CreateLeaderBoard
	3: KILLBALL
	4: pinball
	5: BuildPortals
	6: UpdateTitle
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

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

disabled rule("------------------------------------------------------------------------  General functions ------------------------------------------------------------------------ ")
{
	event
	{
		Ongoing - Global;
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
		End;
		Modify Global Variable(TQ2, Append To Array, Last Created Entity);
		Wait(0.016, Ignore Condition);
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
				Create Effect(Filtered Array(All Players(All Teams), Current Array Element.C || !Current Array Element.NotOnLastCp), Bad Aura,
					Evaluate Once(Global.NANBA) % 2 == 1 ? Color(Aqua) : Color(Orange), Global.PortalLoc[Evaluate Once(Global.NANBA)], 0.600,
					Visible To);
				Create In-World Text(Filtered Array(All Players(All Teams), Current Array Element.C || !Current Array Element.NotOnLastCp),
					Custom String("{0}", Global.PortalNames[Evaluate Once(Global.NANBA)]), Global.PortalLoc[Evaluate Once(Global.NANBA)] + Vector(
					0, 1, 0), 1, Clip Against Surfaces, Visible To, Color(White), Default Visibility);
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

disabled rule("------------------------------------------------------------------------  Editor ------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Editor | Clear Excess Data to Save Map")
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
		Host Player.A = 0;
		Global.C = 0;
		Global.J = 0;
		Global.K = 0;
		Global.L = 0;
		Global.P = 0;
		Global.TQ1 = 0;
		Global.NANBA = 0;
		Global.TQ2 = 0;
		Global.TQ3 = 0;
		Global.SaveName = Empty Array;
		Global.SaveCp = Empty Array;
		Global.SaveTimer = Empty Array;
		Global.SaveEnt = Empty Array;
		Global.SavePauseTime = Empty Array;
		Global.SavePauseEnabled = Empty Array;
		Global.SaveElapsed = Empty Array;
		Global.LeaderBoardFull = Empty Array;
		Global.LeaderBoardHuds = Empty Array;
		Global.PortalOn = False;
		Global.TitleData = Null;
		Global.CpHudText = Null;
		Global.CpHudCp = Null;
		Global.CpIwtText = Null;
		Global.CpIwtCp = Null;
		Global.CpIwtPos = Null;
		Global.CpIwtColor = Null;
		Global.PortalNames = Empty Array;
		Global.PortalLoc = Empty Array;
		Global.PortalDest = Empty Array;
		Global.CustomPortalStart = Empty Array;
		Global.CustomPortalEndpoint = Empty Array;
		Global.CustomPortalCP = Empty Array;
		Global.BanTriple = Empty Array;
		Global.BanMulti = Empty Array;
		Global.BanCreate = Empty Array;
		Global.BanDead = Empty Array;
		Global.BanEmote = Empty Array;
		Global.BanClimb = Empty Array;
		Global.BanBhop = Empty Array;
		Enable Inspector Recording;
		Create HUD Text(Event Player, Custom String(" "), Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(
			Rose)) == Custom String("玫红") ? Custom String(
			"　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n 0. 清理多余数据:\n打开此窗口时自动完成\n\n1. 复制数据:\n打开工作坊检查→将可变目标设置为全局\n\n按[x]\n2. 插入数据:\n将数据粘贴到名为'map data{0}",
			Custom String("'的规则中(第2页)\n\n3.车间设置:\nESC→展示大厅→设置→工作坊设置→\n关闭'编辑模式'\n选择显示难度\n")) : Custom String(
			"　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   0. clear excess data:\n Automatically done when opening this window\n\n   1. Copy da{0}",
			Custom String(
			"ta:\n Open Workshop Inspector → Set variable target as global\n click the [x]\n\n   2. Insert data:\n Paste the data in the rul{0}",
			Custom String(
			"e named 'map data pasta' (first rule)\n\n   3. Workshop settings:\n ESC→SHOW LOBBY→SETTINGS→ workshop settings →\n toggle 'Edi{0}",
			Custom String("tor mode' off\n Select display difficulty\n")))), Top, -186, Color(Lime Green), Color(Lime Green), Color(
			Lime Green), String, Default Visibility);
		Event Player.savemaphud[0] = Last Text ID;
		Create HUD Text(Event Player, Custom String(" "), Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(
			Rose)) == Custom String("玫红") ? Custom String(
			"　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n4. 创建初始共享代码:\nEsc→显示大厅→设置→共享代码→\n创建新代码→复制代码\n\n5. 添加参与者:\n在'Credits here'规则中输入您的姓名和地图代码\n\n{0}",
			Custom String("(第二页)\n6. 参与者更新:\nEsc→显示大厅→设置→共享代码→\n上传到现有代码→粘贴在步骤4中创建的代码\n")) : Custom String(
			"　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n   4. Create initial sharecode:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n CREATE NEW COD{0}",
			Custom String(
			"E→COPY CODE\n\n   5. Add credits:\n Enter your name & map code in the 'Credits here' rule\n (second rule) \n\n   6. Update for c{0}",
			Custom String(
			"redits:\n ESC→SHOW LOBBY→SETTINGS→SHARE CODE→\n UPLOAD TO EXISTING CODE→ PASTE THE CODE YOU CREATED IN STEP 4\n"))), Top,
			-185, Color(Lime Green), Color(Lime Green), Color(Lime Green), String, Default Visibility);
		Event Player.savemaphud[1] = Last Text ID;
		Create HUD Text(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("    > 按互动键关闭当前窗口 <    ") : Custom String("    > Press Interact to close this window <    "), Null, Null, Top,
			-184, Color(Lime Green), Null, Null, String, Default Visibility);
		Event Player.savemaphud[2] = Last Text ID;
		Wait Until(!Is Button Held(Event Player, Button(Interact)), 9999);
		Wait Until(Is Button Held(Event Player, Button(Interact)), 9999);
		Destroy HUD Text(First Of(Event Player.savemaphud));
		Destroy HUD Text(Event Player.savemaphud[1]);
		Destroy HUD Text(Event Player.savemaphud[2]);
	}
}

rule("Editor | Hud and Effects")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"@Condition hostPlayer.EditorOn\r\n condition messes up if host player leaves"
		Wait Until(Has Spawned(Host Player), 90);
		Wait(1, Ignore Condition);
		If(!Host Player.EditorOn);
			Global.HudStoreEdit = Null;
			Abort;
		End;
		Wait(2, Ignore Condition);
		"remove unnesesary huds"
		While(Count Of(Global.HudStoreEdit) > 0);
			Destroy HUD Text(First Of(Global.HudStoreEdit));
			Destroy In-World Text(First Of(Global.HudStoreEdit));
			Modify Global Variable(HudStoreEdit, Remove From Array By Index, 0);
		End;
		Wait(0.016, Ignore Condition);
		"infinite time and atemps"
		If(Global.CompMode);
			Global.CompAtmpNum = 0;
			Global.CompTime = 99999;
			All Players(All Teams).AttemptCount = Null;
			All Players(All Teams).CompDone = False;
		End;
		"huds =========================================================================================================================================================================="
		Create HUD Text(Host Player.K ? Host Player : Null, Null, Null, Custom String("{0}", String("Capture") == Custom String("捕捉")
			|| Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Array(Custom String("{0} + {1} | 新建检查点\n{2}",
			Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | 删除选中的检查点\n{2}",
			Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String(
			"{0} + {1} | 移除/新建传送点\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Reload)), Custom String(
			"{0} + {1} | 移动检查点至当前位置\n{0} + {2} | 检查点碰撞模型\n{1} (长按) | 微调检查点位置", Input Binding String(Button(Interact)),
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 1)))))), Custom String("{0} + {1} | 新建击杀球\n{2}",
			Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | 删除选中的击杀球\n{2}",
			Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String(
			"{0} + {1} | 选择上一个击杀球\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String(
			"{0} + {1} | 选择下一个击杀球\n\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String(
			"{0} + {1} | 增大击杀球尺寸\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String(
			"{0} + {1} | 减小击杀球尺寸\n{2}", Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String(
			"{0} + {1} | 向前移动击杀球\n{0} + {2} | 向后移动击杀球", Input Binding String(Button(Ability 2)), Input Binding String(Button(
			Primary Fire)), Input Binding String(Button(Secondary Fire))))))))), Custom String("{0} + {1} | 新建弹球\n{2}",
			Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | 选择上一个弹球\n{2}",
			Input Binding String(Button(Interact)), Input Binding String(Button(Crouch)), Custom String("{0} + {1} | 选择下一个弹球\n\n{2}",
			Input Binding String(Button(Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | 删除选中的弹球\n{2}",
			Input Binding String(Button(Interact)), Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | 增加弹球弹力\n{2}",
			Input Binding String(Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | 减少弹球弹力\n{2}",
			Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String(
			"{0} + {1} | 向前移动弹球\n{0} + {2} | 向后移动弹球", Input Binding String(Button(Ability 2)), Input Binding String(Button(Primary Fire)),
			Input Binding String(Button(Secondary Fire))))))))))[Host Player.E] : Array(Custom String(
			"{0} + {1} | Create New Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)),
			Custom String("{0} + {1} | Delete selected Checkpoint\n{2}", Input Binding String(Button(Interact)), Input Binding String(
			Button(Secondary Fire)), Custom String("{0} + {1} | Remove/Add teleport\n{2}", Input Binding String(Button(Interact)),
			Input Binding String(Button(Reload)), Custom String("{0} + {1} | Set Checkpoint to current position\n{2}",
			Input Binding String(Button(Interact)), Input Binding String(Button(Ultimate)), Custom String(
			"{0} + {1} | Toggle Checkpoint Hitbox\n{2} (hold) | Precise position changing", Input Binding String(Button(Interact)),
			Input Binding String(Button(Ability 1)), Input Binding String(Button(Melee))))))), Custom String(
			"{0} + {1} | Create new kill orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)),
			Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(
			Secondary Fire)), Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)),
			Input Binding String(Button(Crouch)), Custom String("{0} + {1} | Select next orb\n\n{2}", Input Binding String(Button(
			Interact)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Increase orb size\n{2}", Input Binding String(
			Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb size\n{2}",
			Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String(
			"{0} + {1} | Move orb forward\n{0} + {2} | Move orb Backward", Input Binding String(Button(Ability 2)), Input Binding String(
			Button(Primary Fire)), Input Binding String(Button(Secondary Fire))))))))), Custom String(
			"{0} + {1} | Create new Bounce orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(Primary Fire)),
			Custom String("{0} + {1} | Select previous orb\n{2}", Input Binding String(Button(Interact)), Input Binding String(Button(
			Crouch)), Custom String("{0} + {1} | Select next orb\n\n{2}", Input Binding String(Button(Interact)), Input Binding String(
			Button(Jump)), Custom String("{0} + {1} | Delete selected orb\n{2}", Input Binding String(Button(Interact)),
			Input Binding String(Button(Secondary Fire)), Custom String("{0} + {1} | Increase orb strength\n{2}", Input Binding String(
			Button(Ability 2)), Input Binding String(Button(Jump)), Custom String("{0} + {1} | Decrease orb strength\n{2}",
			Input Binding String(Button(Ability 2)), Input Binding String(Button(Crouch)), Custom String(
			"{0} + {1} | Move orb forward\n{0} + {2} | Move orb back", Input Binding String(Button(Ability 2)), Input Binding String(
			Button(Primary Fire)), Input Binding String(Button(Secondary Fire))))))))))[Host Player.E]), Right, -148, Null, Null, Color(
			Yellow), Visible To and String, Default Visibility);
		Create HUD Text(Host Player.K ? Host Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}",
			Color(Rose)) == Custom String("玫红") ? Custom String(" \n{0} + {1} | 下一个检查点\n{2}", Input Binding String(Button(Crouch)),
			Input Binding String(Button(Primary Fire)), Custom String("{0} + {1} | 上一个检查点\n{2} | 飞行 (仅限检查点模式)\n", Input Binding String(
			Button(Crouch)), Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Ability 2)))) : Custom String(
			" \n{0} + {1} | Next checkpoint\n{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Primary Fire)),
			Custom String("{0} + {1} | Prev checkpoint\n{2} | Fly (checkpoint mode only)\n", Input Binding String(Button(Crouch)),
			Input Binding String(Button(Secondary Fire)), Input Binding String(Button(Ability 2)))), Right, -149, Null, Null,
			Host Player.K ? Color(Green) : Color(Orange), Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.K ? Host Player : Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(
			Rose)) == Custom String("玫红") ? Custom String("保存地图长按 {0} + {1} + {2} 后按弹出窗口的提示进行操作", Input Binding String(Button(Interact)),
			Input Binding String(Button(Melee)), Input Binding String(Button(Reload))) : Custom String(
			"to save map hold {0} + {1} + {2} and follow instructions", Input Binding String(Button(Interact)), Input Binding String(
			Button(Melee)), Input Binding String(Button(Reload))), Null, Left, -197, Null, Color(Yellow), Null, Visible To and String,
			Default Visibility);
		Create HUD Text(All Players(All Teams), String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
			== Custom String("玫红") ? (Local Player == Host Player ? Custom String(" {0} {1} ", Array(Icon String(Flag), Icon String(Skull),
			Icon String(Moon))[Host Player.E], Array(Custom String("检查点模式"), Custom String("击杀球模式"), Custom String("弹球模式"))[Host Player.E])
			: Custom String(" {0} 源氏 编辑者 {0} \n 房主/编辑者: {1} ", Icon String(Bolt), Host Player)) : (
			Local Player == Host Player ? Custom String(" {0} {1} ", Array(Icon String(Flag), Icon String(Skull), Icon String(Moon))
			[Host Player.E], Array(Custom String("Checkpoints mode"), Custom String("Kill Orb mode"), Custom String("Bounce Orb mode"))
			[Host Player.E]) : Custom String(" {0} Genji editor {0} \n host/editor: {1} ", Icon String(Bolt), Host Player)), Null, Null,
			Top, -175, Color(Blue), Color(Blue), Color(Blue), Visible To and String, Default Visibility);
		Create HUD Text(Host Player.K ? Host Player : Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(
			Rose)) == Custom String("玫红") ? Custom String("长按 {0} 切换作图模式", Input Binding String(Button(Ability 1))) : Custom String(
			"Hold {0} to change mode", Input Binding String(Button(Ability 1))), Null, Top, -176, Color(Sky Blue), Color(Sky Blue), Color(
			Sky Blue), Visible To and String, Default Visibility);
		Create HUD Text(Host Player.K && (Host Player.E == 0 || (Host Player.E == 2 && Count Of(Host Player.BounceIndex_Cache) > 0))
			? Host Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
			== Custom String("玫红") ? Custom String("{0} + {1} | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(
			Primary Fire)), Custom String("{0} {1} | {2}", Host Player.E == 0 ? Custom String("检查点给刀") : Custom String("弹球给刀"),
			Ability Icon String(Hero(Genji), Button(Ultimate)), Host Player.E == 2 ? (
			Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Custom String("启用") : Custom String("关闭")) : (Array Contains(
			Global.Dao, Host Player.A) ? Custom String("启用") : Custom String("关闭")))) : Custom String("{0} + {1} | {2}",
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Primary Fire)), Custom String("{0} give ult {1} | {2}",
			Host Player.E == 0 ? Custom String("Level") : Custom String("Orb"), Ability Icon String(Hero(Genji), Button(Ultimate)),
			Host Player.E == 2 ? (Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Custom String("on") : Custom String("off"))
			: (Array Contains(Global.Dao, Host Player.A) ? Custom String("on") : Custom String("off")))), Left, -190, Null, Null,
			Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 && Host Player.E == 2 ? Color(Green) : (Array Contains(Global.Dao,
			Host Player.A) && Host Player.E == 0 ? Color(Green) : Color(Orange)), Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.K && (Host Player.E == 0 || (Host Player.E == 2 && Count Of(Host Player.BounceIndex_Cache) > 0))
			? Host Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
			== Custom String("玫红") ? Custom String("{0} + {1} | {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(
			Secondary Fire)), Custom String("{0} {1} | {2}", Host Player.E == 0 ? Custom String("检查点给Shift") : Custom String("弹球给Shift"),
			Ability Icon String(Hero(Genji), Button(Ability 1)), Host Player.E == 2 ? (
			Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Custom String("启用") : Custom String("关闭")) : (Array Contains(
			Global.SHIFT, Host Player.A) ? Custom String("启用") : Custom String("关闭")))) : Custom String("{0} + {1} | {2}",
			Input Binding String(Button(Ultimate)), Input Binding String(Button(Secondary Fire)), Custom String("{0} give dash {1} | {2}",
			Host Player.E == 0 ? Custom String("Level") : Custom String("Orb"), Ability Icon String(Hero(Genji), Button(Ability 1)),
			Host Player.E == 2 ? (Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Custom String("on") : Custom String("off"))
			: (Array Contains(Global.SHIFT, Host Player.A) ? Custom String("on") : Custom String("off")))), Left, -189, Null, Null,
			Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 && Host Player.E == 2 ? Color(Green) : (Array Contains(Global.SHIFT,
			Host Player.A) && Host Player.E == 0 ? Color(Green) : Color(Orange)), Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.E == 2 && Host Player.K && Count Of(Host Player.BounceIndex_Cache) > 0 ? Host Player : Null, Null,
			Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String(
			"{0} + {1} |  黄弹球(进点前必须收集) {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(Ability 2)),
			Custom String("{0} | {1}\n", Icon String(Asterisk),
			Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Custom String("启用") : Custom String("关闭")))
			: Custom String("{0} + {1} | unlocks checkpoint {2}", Input Binding String(Button(Ultimate)), Input Binding String(Button(
			Ability 2)), Custom String("{0} | {1}\n", Icon String(Asterisk),
			Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Custom String("on") : Custom String("off"))), Left,
			-188, Null, Null, Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] != 0 ? Color(Green) : Color(Orange),
			Visible To String and Color, Default Visibility);
		Create HUD Text(Host Player.K ? Host Player : Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
			== Custom String("玫红") ? Custom String("球体/传送门上限: {0}/{1} ", Count Of(Global.TQ) + Count Of(Global.H) + Count Of(
			Global.CustomPortalStart), 193) : Custom String("orb/portal limit: {0}/{1} ", Count Of(Global.TQ) + Count Of(Global.H)
			+ Count Of(Global.CustomPortalStart), 193), Null, Null, Left, -192, Color(Blue), Color(Sky Blue), Color(Sky Blue),
			Visible To and String, Default Visibility);
		"display selected cc/orb info"
		Create HUD Text(Host Player.K ? Host Player : Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
			== Custom String("玫红") ? (Host Player.E == 0 && Count Of(Global.A) > 0 ? Custom String("\n 选中的检查点 \n 矢量: {0}{1} \n",
			Global.A[Host Player.A], Count Of(Global.A[Host Player.A]) < 2 ? Custom String("") : Custom String("\n 传送点: {0}",
			Global.A[Host Player.A][1])) : (Host Player.E == 1 && Count Of(Host Player.KillIndex_Cache) > 0 ? Custom String(
			"\n 选中的击杀球 \n 矢量: {0} \n 半径: {1} \n", Global.H[Host Player.KillIndex_Cache[Global.J]],
			Global.I[Host Player.KillIndex_Cache[Global.J]]) : (Host Player.E == 2 && Count Of(Host Player.BounceIndex_Cache)
			> 0 ? Custom String("\n 选中的弹球 \n 矢量: {0} \n 弹力: {1} \n", Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]],
			Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]]) : Custom String("\n   当前无数据选中   \n")))) : (
			Host Player.E == 0 && Count Of(Global.A) > 0 ? Custom String("\n Selected Checkpoint \n Vector: {0}{1} \n",
			Global.A[Host Player.A], Count Of(Global.A[Host Player.A]) < 2 ? Custom String("") : Custom String("\n Teleport: {0}",
			Global.A[Host Player.A][1])) : (Host Player.E == 1 && Count Of(Host Player.KillIndex_Cache) > 0 ? Custom String(
			"\n Selected Kill Orb \n Vector: {0} \n radius: {1} \n", Global.H[Host Player.KillIndex_Cache[Global.J]],
			Global.I[Host Player.KillIndex_Cache[Global.J]]) : (Host Player.E == 2 && Count Of(Host Player.BounceIndex_Cache)
			> 0 ? Custom String("\n Selected Bounce Orb \n Vector: {0} \n strength: {1} \n",
			Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]], Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]])
			: Custom String("\n   No data selected   \n")))), Null, Null, Left, -191, Color(White), Color(Orange), Color(Orange),
			Visible To and String, Default Visibility);
		Wait(2, Ignore Condition);
		"effects ==========================================================================================================================================================================\r\n Purple bounce selection aura"
		Create Effect(Host Player.A != -1 && Host Player.BouncePosition_Cache && Host Player.E == 2 ? All Players(All Teams) : Null,
			Good Aura, Color(Purple), Global.TQ3, 1, Visible To Position and Radius);
		"Selected kill orb text"
		Create In-World Text(Host Player.A != -1 && Host Player.KillPosition_Cache && Host Player.E == 1 ? All Players(All Teams) : Null,
			String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("已选中该弹球")
			: Custom String("Selected Kill Orb"), Global.H[Host Player.KillIndex_Cache[Global.J]], 1.600, Do Not Clip,
			Visible To Position and String, Color(Sky Blue), Default Visibility);
		"Red distance orb for kill orb"
		Create Effect(Host Player.A != -1 && Host Player.KillPosition_Cache && Host Player.E == 1 ? All Players(All Teams) : Null, Orb,
			Color(Red), Global.L, 1, Visible To Position and Radius);
		"Distance # text for kill orb (removed the L from M string)"
		Create In-World Text(Host Player.A != -1 && Host Player.KillPosition_Cache && Host Player.E == 1 ? All Players(All Teams) : Null,
			Custom String("{0} m", Distance Between(Host Player, Global.L)), Global.L - Vector(0, 1.500, 0), 1.500, Do Not Clip,
			Visible To Position and String, Color(Red), Default Visibility);
		"Purple sphere for teleport location"
		Create Effect(Count Of(Global.A[Host Player.A]) > 1 && Host Player.E == 0 ? All Players(All Teams) : Null, Sphere, Color(Purple),
			Global.A[Host Player.A][1] - Vector(0, 0.100, 0), 0.200, Visible To Position and Radius);
		"Teleport text"
		Create In-World Text(Count Of(Global.A[Host Player.A]) > 1 && Host Player.E == 0 ? All Players(All Teams) : Null, String("Capture")
			== Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("传送点位置") : Custom String(
			"teleporter location"), Global.A[Host Player.A][1], 1.600, Do Not Clip, Visible To Position and String, Color(Sky Blue),
			Default Visibility);
		"normal cp if teleport"
		Create Effect(Global.A[Host Player.A][1] && Host Player.E == 0 ? Host Player : Null, Ring, Color(Orange), First Of(
			Global.A[Host Player.A]), 1, Visible To Position and Radius);
		Create In-World Text(Global.A[Host Player.A][1] && Host Player.E == 0 ? Host Player : Null, String("Capture") == Custom String(
			"捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("检查点点的位置") : Custom String("level location"),
			First Of(Global.A[Host Player.A]), 1.600, Do Not Clip, Visible To Position and String, Color(Sky Blue), Default Visibility);
	}
}

rule("Editor |  Fly/Noclip Toggle")
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
		Event Player.E == 0;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		Is Button Held(Event Player, Button(Crouch)) == False;
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
		Event Player.flytoggle = Null;
		Stop Forcing Player Position(Event Player);
		Wait(1, Ignore Condition);
	}
}

rule("Editor | change mode")
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
		Event Player == Host Player;
		Is Button Held(Event Player, Button(Ability 1)) == True;
	}

	actions
	{
		Wait(0.840, Abort When False);
		Event Player.flytoggle = Null;
		Small Message(Host Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Array(Custom String("   当前模式: 击杀球"), Custom String("   当前模式: 弹球"), Custom String("   当前模式: 检查点"))[Event Player.E] : Array(
			Custom String("   Current mode: Kill Orb"), Custom String("   Current mode: Bounce Orb"), Custom String(
			"   Current mode: Checkpoint"))[Event Player.E]);
		Wait(0.016, Ignore Condition);
		Event Player.E = (Event Player.E + 1) % 3;
	}
}

rule("Editor | create cp/orb")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.EditorOn != False;
		Event Player == Host Player;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Primary Fire)) == True;
	}

	actions
	{
		If(Event Player.E == 0);
			If(Count Of(Global.A) > 1 && Distance Between(Event Player, Global.A[Host Player.A]) <= 1.400);
				Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
					? Custom String("   放置的检查点距离太近") : Custom String("   Cannot place checkpoints too close."));
				Abort;
			End;
			If(Event Player.A > Count Of(Global.A) - 1);
				Event Player.A = Count Of(Global.A) - 1;
			End;
			If(Host Player.A == Count Of(Global.A) - 1);
				Modify Global Variable(A, Append To Array, Position Of(Event Player));
				Event Player.A += 1;
				Call Subroutine(UpdateCache);
			Else;
				Modify Global Variable(A, Append To Array, Position Of(Event Player));
				Global.A = Mapped Array(Global.A, Current Array Index < Host Player.A + 1 ? Current Array Element : (
					Current Array Index == Host Player.A + 1 ? Last Of(Global.A) : Global.A[Current Array Index - 1]));
				Host Player.A += 1;
				Global.killballnumber = Mapped Array(Global.killballnumber, Current Array Element + (
					Current Array Element >= Host Player.A ? 1 : 0));
				Global.pinballnumber = Mapped Array(Global.pinballnumber, Current Array Element + (
					Current Array Element >= Host Player.A ? 1 : 0));
				Global.Dao = Mapped Array(Global.Dao, Current Array Element + (Current Array Element >= Host Player.A ? 1 : 0));
				Global.SHIFT = Mapped Array(Global.SHIFT, Current Array Element + (Current Array Element >= Host Player.A ? 1 : 0));
				Call Subroutine(UpdateCache);
				Call Subroutine(RebuildKillOrbs);
				Call Subroutine(RebuildBounceOrbs);
			End;
			Small Message(All Players(All Teams), String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
				== Custom String("玫红") ? Custom String("   新检查点已创建") : Custom String("   New Checkpoint has been created"));
		Else If(Event Player.E == 1);
			If(Count Of(Global.TQ) + Count Of(Global.H) + Count Of(Global.CustomPortalStart) >= 193);
				Big Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
					? Custom String("当前地图弹球/传送门数量已达上限") : Custom String("Orb/portal limit reached for this map"));
				Wait(0.016, Ignore Condition);
				Abort;
			End;
			Modify Global Variable(H, Append To Array, Position Of(Event Player));
			Modify Global Variable(killballnumber, Append To Array, Event Player.A);
			Call Subroutine(UpdateCache);
			Global.J = Count Of(Host Player.KillIndex_Cache) - 1;
			Global.I[Host Player.KillIndex_Cache[Global.J]] = 5;
			Create Effect(Filtered Array(Append To Array(All Players(All Teams), Null),
				Current Array Element.A == Global.killballnumber[Evaluate Once(Host Player.KillIndex_Cache[Global.J])]), Sphere, Color(Blue),
				Global.H[Evaluate Once(Host Player.KillIndex_Cache[Global.J])], Global.I[Evaluate Once(Host Player.KillIndex_Cache[Global.J])],
				Visible To Position and Radius);
			Modify Global Variable(K, Append To Array, Last Created Entity);
			Call Subroutine(UpdateCache);
			Global.J = Count Of(Host Player.KillIndex_Cache) - 1;
			Global.L = Global.H[Host Player.KillIndex_Cache[Global.J]];
			Call Subroutine(RebuildKillOrbs);
			Big Message(All Players(All Teams), Custom String("{0} {1}", String("Capture") == Custom String("捕捉") || Custom String("{0}",
				Color(Rose)) == Custom String("玫红") ? Custom String("新击杀球已创建! \r\n仅生效于检查点") : Custom String(
				"New Kill Orb has been created! \r\nIt's only valid for checkpoint"), Event Player.A));
		Else If(Event Player.E == 2);
			If(Count Of(Global.TQ) + Count Of(Global.H) + Count Of(Global.CustomPortalStart) >= 193);
				Big Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
					? Custom String("当前地图弹球/传送门数量已达上限") : Custom String("Orb/portal limit reached for this map"));
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
			Big Message(All Players(All Teams), Custom String("{0} {1}", String("Capture") == Custom String("捕捉") || Custom String("{0}",
				Color(Rose)) == Custom String("玫红") ? Custom String("新弹球已创建! \r\n仅生效于检查点") : Custom String(
				"New Bounce Orb has been created! \r\nIt's only valid for checkpoint"), Event Player.A));
		End;
		Wait(0.640, Ignore Condition);
	}
}

rule("Editor | delete cp/orb")
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
		If(Event Player.E == 0 && Count Of(Global.A) > 0);
			"Resync Kill Orbs"
			Event Player.Temp = Empty Array;
			Event Player.Temp = Filtered Array(Mapped Array(Global.killballnumber,
				Current Array Element == Host Player.A ? Current Array Index : -1), Current Array Element >= 0);
			"eventPlayer.Temp = [i for e, i in KillballCheckpoints if e == hostPlayer.CurrentCheckpoint]"
			For Global Variable(NANBA, 0, Count Of(Event Player.Temp), 1);
				Destroy Effect(Global.K[Event Player.Temp[Global.NANBA]]);
				Modify Global Variable(K, Remove From Array By Index, Event Player.Temp[Global.NANBA]);
				Wait(0.016, Ignore Condition);
			End;
			"Remove specified checkpoint"
			Global.killballnumber = Remove From Array(Global.killballnumber, Host Player.A);
			"Decrement checkpoints after removed one"
			Global.killballnumber = Mapped Array(Global.killballnumber, Current Array Element - (
				Current Array Element > Host Player.A ? 1 : 0));
			"Remove Radii at Checkpoint indexes (temp)"
			Global.I = Filtered Array(Global.I, !Array Contains(Event Player.Temp, Current Array Index));
			Global.H = Filtered Array(Global.H, !Array Contains(Event Player.Temp, Current Array Index));
			Global.J = Count Of(Host Player.KillIndex_Cache) - 1;
			Global.L = Global.H[Host Player.KillIndex_Cache[Global.J]];
			Event Player.Temp = Empty Array;
			"Resync Bounce Orbs"
			Event Player.Temp = Filtered Array(Mapped Array(Global.pinballnumber,
				Current Array Element == Host Player.A ? Current Array Index : -1), Current Array Element >= 0);
			"eventPlayer.Temp = [i for e, i in BouncePadCheckpoints if e == hostPlayer.CurrentCheckpoint]"
			For Global Variable(NANBA, 0, Count Of(Event Player.Temp), 1);
				Destroy Effect(Global.TQ2[Event Player.Temp[Global.NANBA]]);
				Modify Global Variable(TQ2, Remove From Array By Index, Event Player.Temp[Global.NANBA]);
				Wait(0.016, Ignore Condition);
			End;
			"Remove specified checkpoint"
			Global.pinballnumber = Remove From Array(Global.pinballnumber, Host Player.A);
			"Decrement checkpoints after removed one"
			Global.pinballnumber = Mapped Array(Global.pinballnumber, Current Array Element - (Current Array Element > Host Player.A ? 1 : 0));
			Global.TQ = Filtered Array(Global.TQ, !Array Contains(Event Player.Temp, Current Array Index));
			Global.EditMode = Filtered Array(Global.EditMode, !Array Contains(Event Player.Temp, Current Array Index));
			Global.TQ5 = Filtered Array(Global.TQ5, !Array Contains(Event Player.Temp, Current Array Index));
			Global.TQ6 = Filtered Array(Global.TQ6, !Array Contains(Event Player.Temp, Current Array Index));
			Global.BounceToggleLock = Filtered Array(Global.BounceToggleLock, !Array Contains(Event Player.Temp, Current Array Index));
			Global.TQ1 = Count Of(Host Player.BounceIndex_Cache) - 1;
			Global.TQ3 = Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]];
			Global.Dao = Remove From Array(Global.Dao, Host Player.A);
			Global.SHIFT = Remove From Array(Global.SHIFT, Host Player.A);
			Global.Dao = Mapped Array(Global.Dao, Current Array Element - (Current Array Element >= Host Player.A ? 1 : 0));
			Global.SHIFT = Mapped Array(Global.SHIFT, Current Array Element - (Current Array Element >= Host Player.A ? 1 : 0));
			Modify Global Variable(A, Remove From Array By Index, Host Player.A);
			Modify Global Variable(C, Remove From Array By Index, Host Player.A);
			If(Host Player.A == 0 && Count Of(Global.A) > 0);
				Host Player.A = 0;
				Skip(5);
			Else If(Host Player.A <= 0);
				Host Player.A = -1;
				Skip(2);
			End;
			Host Player.A -= 1;
			Call Subroutine(RebuildKillOrbs);
			Call Subroutine(RebuildBounceOrbs);
			Small Message(All Players(All Teams), String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
				== Custom String("玫红") ? Custom String("   检查点已删除") : Custom String("   Checkpoint has been deleted"));
		Else If(Event Player.E == 1 && Count Of(Event Player.KillIndex_Cache) != 0 && Host Player.KillPosition_Cache);
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
		Else If(Event Player.E == 2 && Count Of(Event Player.BounceIndex_Cache) != 0 && Host Player.BouncePosition_Cache);
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
		Wait(0.016, Ignore Condition);
	}
}

rule("Editor | toggle orb functions")
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
		Event Player == Host Player;
		Event Player.E == 2;
		Is Button Held(Event Player, Button(Ultimate)) == True;
		(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire)) || Is Button Held(
			Event Player, Button(Ability 2))) == True;
		Count Of(Global.TQ) != 0;
	}

	actions
	{
		If(Is Button Held(Event Player, Button(Primary Fire)));
			Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]] = !Global.TQ5[Host Player.BounceIndex_Cache[Global.TQ1]];
		Else If(Is Button Held(Event Player, Button(Secondary Fire)));
			Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]] = !Global.TQ6[Host Player.BounceIndex_Cache[Global.TQ1]];
		Else;
			Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] = !Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]];
			Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]] = Global.BounceToggleLock[Host Player.BounceIndex_Cache[Global.TQ1]] ? 0 : 10;
		End;
		Call Subroutine(UpdateCache);
		Wait(0.016, Ignore Condition);
	}
}

rule("Editor | orb radi/strength")
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
		Event Player == Host Player;
		Event Player.E > 0;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		(Is Button Held(Event Player, Button(Jump)) || Is Button Held(Event Player, Button(Crouch))) == True;
		Is Button Held(Event Player, Button(Interact)) == False;
	}

	actions
	{
		If(Event Player.E == 2 && Count Of(Event Player.BounceIndex_Cache) > 0);
			Global.EditMode[Host Player.BounceIndex_Cache[Global.TQ1]] += Is Button Held(Event Player, Button(Jump)) ? 0.100 : -0.100;
		Else If(Event Player.E == 1 && Count Of(Event Player.KillIndex_Cache) > 0);
			Global.I[Host Player.KillIndex_Cache[Global.J]] += Is Button Held(Event Player, Button(Jump)) ? 0.100 : -0.100;
		End;
		Wait(0.100, Ignore Condition);
		Loop If Condition Is True;
		Call Subroutine(UpdateCache);
	}
}

rule("Editor | move orbs")
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
		Event Player == Host Player;
		Event Player.E > 0;
		Is Button Held(Event Player, Button(Ability 2)) == True;
		(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire))) == True;
	}

	actions
	{
		If(Event Player.E == 1 && Count Of(Event Player.KillIndex_Cache) > 0);
			While(Is Button Held(Event Player, Button(Ability 2)) && (Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(
				Event Player, Button(Secondary Fire))));
				Global.L += Facing Direction Of(Event Player) * (Is Button Held(Event Player, Button(Primary Fire)) ? 0.063 : -0.063);
				Wait(0.016, Ignore Condition);
			End;
			Global.H[Host Player.KillIndex_Cache[Global.J]] = Global.L;
		Else If(Event Player.E == 2 && Count Of(Event Player.BounceIndex_Cache) > 0);
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

rule("Editor | select orb")
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
		Event Player == Host Player;
		Event Player.E > 0;
		Is Button Held(Event Player, Button(Interact)) == True;
		(Is Button Held(Event Player, Button(Crouch)) || Is Button Held(Event Player, Button(Jump))) == True;
	}

	actions
	{
		If(Event Player.E == 1);
			If(Is Button Held(Event Player, Button(Crouch)));
				Global.J = (Global.J - 1) % Count Of(Event Player.KillIndex_Cache);
				Global.J = Global.J >= 0 ? Global.J : Count Of(Event Player.KillIndex_Cache) - 1;
			Else;
				Global.J = (Global.J + 1) % Count Of(Event Player.KillIndex_Cache);
			End;
			Global.L = Global.H[Host Player.KillIndex_Cache[Global.J]];
		Else If(Event Player.E == 2);
			If(Is Button Held(Event Player, Button(Crouch)));
				Global.TQ1 = (Global.TQ1 - 1) % Count Of(Event Player.BounceIndex_Cache);
				Global.TQ1 = Global.TQ1 >= 0 ? Global.TQ1 : Count Of(Event Player.BounceIndex_Cache) - 1;
			Else;
				Global.TQ1 = (Global.TQ1 + 1) % Count Of(Event Player.BounceIndex_Cache);
			End;
			Global.TQ3 = Global.TQ[Host Player.BounceIndex_Cache[Global.TQ1]];
		End;
		Wait(0.016, Ignore Condition);
	}
}

rule("Editor | cp size hitbox display")
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
		Event Player == Host Player;
		Is Button Held(Event Player, Button(Interact)) == True;
		Is Button Held(Event Player, Button(Ability 1)) == True;
	}

	actions
	{
		Event Player.EffectSizeToggle = !Event Player.EffectSizeToggle;
		Wait(0.016, Ignore Condition);
	}
}

rule("Editor | cp add/remove teleport")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Host Player.EditorOn != False;
		Is Button Held(Host Player, Button(Interact)) == True;
		Is Button Held(Host Player, Button(Reload)) == True;
		Is Button Held(Host Player, Button(Melee)) == False;
		Count Of(Global.A) > 1;
		Host Player.E == 0;
	}

	actions
	{
		Wait Until(Is Button Held(Host Player, Button(Melee)) || !(Is Button Held(Host Player, Button(Interact)) && Is Button Held(
			Host Player, Button(Reload))), 0.500);
		Abort If(Is Button Held(Host Player, Button(Melee)) || (Is Button Held(Host Player, Button(Interact)) && Is Button Held(
			Host Player, Button(Reload))));
		If(Host Player.A == 0);
			Small Message(Host Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
				? Custom String("   不能在第一个检查点设置传送门") : Custom String("   Can't place a teleport on first checkpoint"));
			Abort;
		End;
		"remove"
		If(Count Of(Global.A[Host Player.A]) > 1);
			Global.A[Host Player.A] = First Of(Global.A[Host Player.A]);
			Small Message(Host Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
				? Custom String("   等级{0}的传送被移除", Host Player.A) : Custom String("   Teleport for level {0} has been removed", Host Player.A));
		"add"
		Else;
			Global.A[Host Player.A] = Array(Count Of(Global.A[Host Player.A]) != 0 ? First Of(Global.A[Host Player.A])
				: Global.A[Host Player.A], Position Of(Host Player));
			Small Message(Host Player, Custom String("{0} {1}", String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
				== Custom String("玫红") ? Custom String("   传送点已添加到检查点") : Custom String("   Teleport has been added for level"),
				Host Player.A));
		End;
		Wait(0.016, Ignore Condition);
	}
}

rule("Editor | move cp once")
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
		Event Player == Host Player;
		Is Button Held(Event Player, Button(Ultimate)) == True;
		Is Button Held(Event Player, Button(Interact)) == True;
	}

	actions
	{
		If(Global.A[Host Player.A][1]);
			Global.A[Host Player.A] = Array(Position Of(Event Player), Global.A[Host Player.A][1]);
		Else;
			Global.A[Host Player.A] = Position Of(Event Player);
		End;
		Small Message(Host Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("   检查点已移动至当前位置") : Custom String("   Checkpoint has been moved to your position"));
		Wait(0.016, Ignore Condition);
	}
}

rule("Editor | precision moving")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.EditorOn != False;
		Event Player == Host Player;
		Event Player.E == 0;
		Is Button Held(Event Player, Button(Melee)) == True;
		"@Condition eventPlayer.isHoldingButton(Button.ULTIMATE)"
		Count Of(Global.A) > 0;
	}

	actions
	{
		"@Condition eventPlayer.isHoldingButton(Button.PRIMARY_FIRE) == false\r\n@Condition eventPlayer.isHoldingButton(Button.SECONDARY_FIRE) == false"
		Wait(0.500, Abort When False);
		Set Move Speed(Event Player, 3);
		Start Camera(Event Player, Eye Position(Event Player) + Facing Direction Of(Event Player) * -2.500 + Vector(0, 0.500, 0),
			Eye Position(Event Player), 15);
		"while eventPlayer.isHoldingButton(Button.ULTIMATE) and eventPlayer.EditModeSelection == 0 and eventPlayer.isAlive():"
		While(Is Button Held(Event Player, Button(Melee)) && Event Player.E == 0 && Is Alive(Event Player));
			"CheckpointPositions[eventPlayer.CurrentCheckpoint][0] = eventPlayer.getPosition()"
			If(Count Of(Global.A[Host Player.A]));
				Global.A[Host Player.A] = Array(Position Of(Event Player), Global.A[Host Player.A][1]);
			Else;
				Global.A[Host Player.A] = Position Of(Event Player);
			End;
			Wait(0.016, Ignore Condition);
		End;
		Stop Camera(Event Player);
		Set Move Speed(Event Player, 100);
	}
}

rule("add ult/dash")
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
		Event Player == Host Player;
		Host Player.E == 0;
		Count Of(Global.A) > 0;
		"@Condition eventPlayer.isHoldingButton(Button.ULTIMATE) or eventPlayer.isHoldingButton(Button.ABILITY_1)\r\n@Condition eventPlayer.isHoldingButton(Button.INTERACT)"
		(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire))) == True;
		Is Button Held(Event Player, Button(Ultimate)) == True;
	}

	actions
	{
		If(Is Button Held(Event Player, Button(Primary Fire)));
			If(Array Contains(Global.Dao, Event Player.A));
				Global.Dao = Remove From Array(Global.Dao, Event Player.A);
			Else;
				Modify Global Variable(Dao, Append To Array, Event Player.A);
			End;
		Else;
			If(Array Contains(Global.SHIFT, Event Player.A));
				Global.SHIFT = Remove From Array(Global.SHIFT, Event Player.A);
			Else;
				Modify Global Variable(SHIFT, Append To Array, Event Player.A);
			End;
		End;
		"move in other rule"
		Wait(0.016, Ignore Condition);
	}
}

disabled rule("------------------------------------------------------------------------  General rules ------------------------------------------------------------------------ ")
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
		Disable Built-In Game Mode Completion;
		Disable Built-In Game Mode Scoring;
		Disable Built-In Game Mode Music;
		Disable Built-In Game Mode Announcer;
		Start Forcing Spawn Room(All Teams, 0);
		Start Forcing Spawn Room(All Teams, 1);
		Start Forcing Spawn Room(All Teams, 2);
		"wait for map data rule"
		Wait(0.024, Ignore Condition);
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
		Global.TitleData = Null;
		Global.PortalNames = Empty Array;
		Global.PortalLoc = Empty Array;
		Global.PortalDest = Empty Array;
		Global.CustomPortalStart = Empty Array;
		Global.CustomPortalEndpoint = Empty Array;
		Global.CustomPortalCP = Empty Array;
		Wait(1, Ignore Condition);
		Global.DashExploitToggle = Workshop Setting Toggle(Custom String("Ban (applies to all levels)\n封禁(应用于所有关卡)"), Custom String(
			"ban Dash Start - 0关卡Shift"), ${ban_dashstart}, 2);
		Global.PortalOn = Workshop Setting Toggle(Custom String("map settings \n地图设置"), Custom String(
			"enable portals (control maps) - 启用传送门 (占点地图)"), ${portalon}, 10);
		Global.CompMode = Workshop Setting Toggle(Custom String("Competitive mode\n竞赛模式"), Custom String(
			"Turn on competitive mode - 开启竞赛模式"), ${compon}, 100);
		If(Global.CompMode);
			"-! comp minutes !- \r\n 5-240"
			Global.CompTime = Workshop Setting Integer(Custom String("Competitive mode\n竞赛模式"), Custom String("time limit (global) - 时间限制"),
				${comptime}, 1, 240, 101);
			"-! comp attempt count !-"
			Global.CompAtmpNum = Workshop Setting Integer(Custom String("Competitive mode\n竞赛模式"), Custom String("attempt count - 尝试次数"), ${compattempt}, 0,
				500, 102);
			"-! comp restartlimiter !-"
			Global.CompRestartLimit = Workshop Setting Toggle(Custom String("Competitive mode\n竞赛模式"), Custom String(
				"disable restart during run - 竞赛中禁用重新开始"), ${comprestarts}, 103);
		End;
		Wait(5, Ignore Condition);
		Call Subroutine(KILLBALL);
		Wait(2, Ignore Condition);
		Call Subroutine(pinball);
		Wait(2, Ignore Condition);
		Call Subroutine(BuildPortals);
		"Check for editor/host spawn to redo effect reeval"
		Wait Until(Has Spawned(Host Player), 99999);
		Wait(0.016, Ignore Condition);
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
		"if getCurrentGamemode() == Gamemode.HYBRID:\r\n    TimeRemaining = 89\r\nelse:"
		Global.TimeRemaining = 265;
		While(Global.TimeRemaining > 0);
			Wait(60, Ignore Condition);
			Global.TimeRemaining -= 1;
			If(Global.CompMode);
				Global.CompTime -= 1;
				If(Global.CompTime == 0);
					Big Message(All Players(All Teams), String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String(
						"玫红") ? Custom String("时间到了") : Custom String("time's up"));
					All Players(All Teams).CompDone = True;
					Stop Chasing Player Variable(All Players(All Teams), D);
					Disable Built-In Game Mode Respawning(All Players(All Teams));
					Kill(All Players(All Teams), Null);
					Wait(0.032, Ignore Condition);
					Start Rule(CreateLeaderBoard, Restart Rule);
				End;
			End;
		End;
		Big Message(All Players(All Teams), String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String(
			"玫红") ? Custom String("房间已达最大持续时间, 即将重启") : Custom String("maximum lobby time expired, restarting"));
		Wait(5, Ignore Condition);
		If(Current Game Mode == Game Mode(Deathmatch));
			Declare Player Victory(Host Player);
		Else;
			Declare Team Victory(Team Of(Host Player));
	}
}

rule("Player Initialize")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	actions
	{
		"eventPlayer.EditorOn = createWorkshopSetting(bool, \"Editor - 作图模式\",\"Editor mode - 作图模式\" ,  editoron , 0) # Turn Editor On\r\n Turn Editor On"
		Event Player.EditorOn = Workshop Setting Toggle(Custom String("map settings \n地图设置"), Custom String("Editor mode - 作图模式"), ${editoron},
			-1);
		Event Player.K = True;
		Disable Game Mode HUD(Event Player);
		Enable Death Spectate All Players(Event Player);
		Enable Death Spectate Target HUD(Event Player);
		Preload Hero(Event Player, Hero(Genji));
		Set Respawn Max Time(Event Player, 1);
		Event Player.F = False;
		"Climbing the wall prompts the HUD"
		Event Player.J = False;
		Event Player.TY = 0;
		Event Player.bouncetouchedlast = -1;
		"big waits first for about 1 second before loading, to make sure things like comp mode are fully loaded and configured, load fx in meanwhile"
		Wait(1, Ignore Condition);
		Create Effect(Event Player, Ring, Color(Sky Blue), Last Of(Global.A[Event Player.A]), 1, Position and Radius);
		Create Effect(Event Player.NotOnLastCp ? Event Player : Null, Ring, Color(Lime Green), Global.A[Event Player.A + 1], 1,
			Visible To Position and Radius);
		Wait(0.500, Ignore Condition);
		Create Effect(Event Player.NotOnLastCp ? Event Player : Null, Light Shaft, Color(White), Global.A[Event Player.A + 1], 1,
			Visible To Position and Radius);
		Create Icon(Event Player.NotOnLastCp ? Event Player : Null, Global.A[Event Player.A + 1] + Up, Arrow: Down,
			Visible To and Position, Color(Sky Blue), True);
		Wait(0.500, Ignore Condition);
		Create In-World Text(Event Player.NotOnLastCp && Event Player.K ? Event Player : Null,
			Event Player.BounceLockMax_Cache && Count Of(Event Player.LockCollected) < Event Player.BounceLockMax_Cache ? Custom String(
			"{0} {1}", Icon String(Warning), String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
			== Custom String("玫红") ? Custom String("先收集橙球") : Custom String("collect orbs first")) : (String("Capture") == Custom String(
			"捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("到这里来") : Custom String("Come here")),
			Global.A[Event Player.A + 1], 1.500, Do Not Clip, Visible To Position and String, Color(White), Default Visibility);
		Wait(1, Ignore Condition);
		If(!Is Dummy Bot(Event Player));
			Start Forcing Player To Be Hero(Event Player, Hero(Genji));
		"only do the things on genji test bots"
		Else If(Hero Of(Event Player) != Hero(Genji));
			Abort;
		End;
		Wait Until(Has Spawned(Event Player), 9999);
		If(Global.CompMode);
			Set Invisible(Event Player, All);
			"instructions and settings for comp start"
			If(!Array Contains(Global.CompAtmpSaveNames, Custom String("{0}", Event Player)));
				Event Player.instructionhud = True;
				Modify Global Variable(CompAtmpSaveNames, Append To Array, Custom String("{0}", Event Player));
				Modify Global Variable(CompAtmpSaveCount, Append To Array, 1);
				Event Player.AttemptCount = 1;
				Set Move Speed(Event Player, 0);
				Set Ability 1 Enabled(Event Player, False);
				Set Ultimate Ability Enabled(Event Player, False);
				Wait Until(!Is Button Held(Event Player, Button(Interact)), 1);
				Wait Until(Is Button Held(Event Player, Button(Interact)) || Global.CompTime < 1, 99999);
				Set Move Speed(Event Player, 100);
				Event Player.instructionhud = False;
			Else;
				Event Player.AttemptCount = Global.CompAtmpSaveCount[Index Of Array Value(Global.CompAtmpSaveNames, Custom String("{0}",
					Event Player))];
			End;
			If(Event Player.AttemptCount == -1 || Global.CompTime < 1);
				Event Player.CompDone = True;
			End;
		End;
		Wait(0.016, Ignore Condition);
		"initialization of the game"
		Call Subroutine(Sub1);
	}
}

rule("delete save")
{
	event
	{
		Subroutine;
		DeleteSave;
	}

	actions
	{
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

rule("make save")
{
	event
	{
		Subroutine;
		MakeSave;
	}

	actions
	{
		Modify Global Variable(SaveName, Append To Array, Custom String("{0}", Event Player));
		Modify Global Variable(SaveCp, Append To Array, Event Player.A);
		Modify Global Variable(SaveTimer, Append To Array, Event Player.D);
		Modify Global Variable(SaveEnt, Append To Array, Event Player);
		Modify Global Variable(SaveElapsed, Append To Array, Total Time Elapsed);
		Modify Global Variable(SavePauseTime, Append To Array, 0);
		Modify Global Variable(SavePauseEnabled, Append To Array, False);
	}
}

rule("start pause timer")
{
	event
	{
		Subroutine;
		StartPauseTimer;
	}

	actions
	{
		Chase Player Variable At Rate(Event Player, ztjs, 999999, 1, None);
		Global.SaveTimer[Index Of Array Value(Global.SaveEnt, Event Player)] = Event Player.D;
		Global.SaveElapsed[Index Of Array Value(Global.SaveEnt, Event Player)] = Total Time Elapsed;
		Global.SavePauseEnabled[Index Of Array Value(Global.SaveEnt, Event Player)] = True;
	}
}

rule("stop pause timer")
{
	event
	{
		Subroutine;
		StopPauseTimer;
	}

	actions
	{
		Stop Chasing Player Variable(Event Player, ztjs);
		Global.SavePauseTime[Index Of Array Value(Global.SaveEnt, Event Player)] = Event Player.ztjs;
		Event Player.ztjs = 0;
		Global.SavePauseEnabled[Index Of Array Value(Global.SaveEnt, Event Player)] = False;
	}
}

rule("leaderboard hud")
{
	event
	{
		Subroutine;
		CreateLeaderBoard;
	}

	actions
	{
		"turns into global rule so it doesnt delete when player leaves"
		Global.LeaderBoardRemake = False;
		Wait(0.016, Ignore Condition);
		Global.LeaderBoardRemake = True;
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
		"[i[0] for i in var1]   list of first element of each in var 1\r\n [ [name, seconds, prettytime] ]\r\n you already have a time"
		If(Array Contains(Mapped Array(Global.LeaderBoardFull, First Of(Current Array Element)), Custom String("{0}", Event Player)));
			"new time worse"
			If(Event Player.D > First Of(Filtered Array(Global.LeaderBoardFull, First Of(Current Array Element) == Custom String("{0}",
				Event Player)))[1]);
				Skip(19);
			"new time better"
			Else;
				Modify Global Variable(LeaderBoardFull, Remove From Array By Value, Filtered Array(Global.LeaderBoardFull, First Of(
					Current Array Element) == Custom String("{0}", Event Player)));
				Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player), Event Player.D,
					Custom String("{0} {1}", Event Player.D, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
					== Custom String("玫红") ? Custom String("秒") : Custom String("sec")))));
				Call Subroutine(CreateLeaderBoard);
			End;
		"you are not in list yet"
		Else;
			"board has room for more"
			If(Count Of(Global.LeaderBoardFull) < 20);
				Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player), Event Player.D,
					Custom String("{0} {1}", Event Player.D, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
					== Custom String("玫红") ? Custom String("秒") : Custom String("sec")))));
				Call Subroutine(CreateLeaderBoard);
			"20 entries already"
			Else;
				"your time lower then last entry"
				If(Global.LeaderBoardFull[19][1] < Event Player.D);
					Skip(7);
				"you beat the last entry, thus replacing it"
				Else;
					Modify Global Variable(LeaderBoardFull, Remove From Array By Index, 19);
					Modify Global Variable(LeaderBoardFull, Append To Array, Array(Array(Custom String("{0}", Event Player), Event Player.D,
						Custom String("{0} {1}", Event Player.D, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
						== Custom String("玫红") ? Custom String("秒") : Custom String("sec")))));
					Call Subroutine(CreateLeaderBoard);
				End;
			End;
		End;
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
		Event Player.splittime = Event Player.PracticeToggle ? Event Player.practicetimer : Event Player.D;
		Event Player.LockCollected = Empty Array;
		Cancel Primary Action(Event Player);
		Apply Impulse(Event Player, Down, Speed Of(Event Player), To Player, Cancel Contrary Motion);
		Set Status(Event Player, Null, Rooted, 0.100);
		Teleport(Event Player, Last Of(Global.A[Event Player.A]));
		If(Event Player.ban_dedhop && Event Player.C == False && Event Player.NotOnLastCp);
			"if eventPlayer.isOnWall():\r\nsmallMessage(eventPlayer, \"Deathbhop is banned!\")"
			Disallow Button(Event Player, Button(Jump));
			Wait(0.100, Ignore Condition);
			Allow Button(Event Player, Button(Jump));
		End;
		If(Event Player.A == 0 && !Event Player.PracticeToggle);
			Event Player.D = 0;
			Event Player.splittime = 0;
		End;
		If(Is Using Ultimate(Event Player));
			Kill(Event Player, Null);
			Wait(0.016, Ignore Condition);
		End;
		Start Rule(CheckUlt, Restart Rule);
		Start Rule(CheckDash, Restart Rule);
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
		If(Global.CompMode && (Global.CompTime < 1 || Event Player.CompDone));
			Event Player.LeaderboardToggle = True;
			Event Player.CompDone = True;
			Disable Built-In Game Mode Respawning(Event Player);
			Kill(Event Player, Null);
			Abort;
		End;
		If(Global.DashExploitToggle);
			Set Ability 1 Enabled(Event Player, False);
			If(Is Using Ability 1(Event Player));
				Wait Until(!Is Using Ability 1(Event Player), 1.500);
				Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
					? Custom String("   0关卡Shift已禁用!") : Custom String("   Dash Start is banned!"));
			End;
		End;
		If(Is Using Ultimate(Event Player));
			Kill(Event Player, Null);
		End;
		If(Count Of(Global.A) != 0);
			"restarting reset t itle even if non on cp 0"
			Destroy In-World Text(Event Player.TitleStore);
			"load saved progres"
			If(Array Contains(Global.SaveName, Custom String("{0}", Event Player)));
				Global.SaveEnt[Index Of Array Value(Global.SaveName, Custom String("{0}", Event Player))] = Event Player;
				Event Player.A = Global.SaveCp[Index Of Array Value(Global.SaveEnt, Event Player)];
				Event Player.D = Global.SaveTimer[Index Of Array Value(Global.SaveEnt, Event Player)];
				Global.SaveElapsed[Index Of Array Value(Global.SaveEnt, Event Player)] = Total Time Elapsed;
				Global.SavePauseTime[Index Of Array Value(Global.SaveEnt, Event Player)] = 0;
				Global.SavePauseEnabled[Index Of Array Value(Global.SaveEnt, Event Player)] = False;
				Teleport(Event Player, Global.A[Event Player.A] + Up);
				"if any title data, find last cp"
				If(Global.TitleData != Null && Is True For Any(Filtered Array(First Of(Global.TitleData), Current Array Element <= Event Player.A),
					Current Array Element) && !Event Player.EditorOn);
					Create In-World Text(Event Player.invis ? Null : All Players(All Teams), Global.TitleData[1][Index Of Array Value(First Of(
						Global.TitleData), First Of(Sorted Array(Filtered Array(First Of(Global.TitleData), Current Array Element <= Event Player.A),
						Current Array Element * -1)))], Event Player, 1.100, Clip Against Surfaces, Visible To and Position,
						Global.TitleData[2][Index Of Array Value(First Of(Global.TitleData), First Of(Sorted Array(Filtered Array(First Of(
						Global.TitleData), Current Array Element <= Event Player.A), Current Array Element * -1)))], Default Visibility);
					Event Player.TitleStore = Last Text ID;
				End;
			Else;
				Teleport(Event Player, First Of(Global.A) + Up);
				Event Player.A = 0;
				Event Player.D = 0;
				Stop Chasing Player Variable(Event Player, ztjs);
				Event Player.ztjs = 0;
				Call Subroutine(MakeSave);
				Call Subroutine(UpdateTitle);
			End;
		End;
		Event Player.splittime = 0;
		Chase Player Variable At Rate(Event Player, D, 9999999.000, 1, None);
		Set Status(Event Player, Null, Phased Out, 9999);
		Set Status(Event Player, Null, Invincible, 9999);
		Event Player.LockCollected = Empty Array;
		Event Player.C = False;
		"eventPlayer.LockState = false"
		Call Subroutine(UpdateCache);
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
		Abort If(Global.H == Empty Array || Host Player.EditorOn);
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
		Abort If(Global.TQ == Empty Array || Host Player.EditorOn);
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

rule("Arrive | Ground reset | traces")
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
		Is Alive(Event Player) == True;
	}

	actions
	{
		If(Event Player.A == Count Of(Global.A) - 1);
			If(Is Moving(Event Player)
				&& Event Player.PracticeToggle == False && Event Player.invis == False && Event Player.EditorOn == False && Global.CompMode == False);
				"traces ----------------------------------------------------------------------------------------------------"
				Event Player.finishfxcache = Array(Color(Red), Color(Orange), Color(Yellow), Color(Lime Green), Color(Green), Color(Turquoise),
					Color(Blue), Color(Purple), Color(Violet), Color(Rose))[Round To Integer(Total Time Elapsed * 2, Down) % 10];
				"eventPlayer.finishfxcache =  rgb((cosDeg(getTotalTimeElapsed()/2 * 360 - 0) + 0.5) * 255, (cosDeg(getTotalTimeElapsed/2 * 360 - 120) + 0.5) * 255, (cosDeg(getTotalTimeElapsed/2 * 360 - 240) + 0.5) * 255)"
				Wait(0.160, Ignore Condition);
				"1.6 - 0.2 in 0.2 steps"
				Play Effect(All Players(All Teams), Ring Explosion, Event Player.finishfxcache, Position Of(Event Player), 1.400);
				Play Effect(All Players(All Teams), Ring Explosion, Event Player.finishfxcache, Position Of(Event Player), 1.200);
				Play Effect(All Players(All Teams), Ring Explosion, Event Player.finishfxcache, Position Of(Event Player), 1);
				Play Effect(All Players(All Teams), Ring Explosion, Event Player.finishfxcache, Position Of(Event Player), 0.800);
				Play Effect(All Players(All Teams), Ring Explosion, Event Player.finishfxcache, Position Of(Event Player), 0.600);
				Play Effect(All Players(All Teams), Ring Explosion, Event Player.finishfxcache, Position Of(Event Player), 0.400);
				Wait(0.128, Ignore Condition);
			End;
		Else If(Event Player.NotOnLastCp && Event Player.C == False && (Global.CompMode == False || Global.CompTime > 0)
				&& Event Player.LockState == False);
			If(Distance Between(Event Player, Global.A[Event Player.A + 1]) <= 1.400);
				"arrived ----------------------------------------------------------------------------------------------------"
				Event Player.MovedCheckpoint = True;
				"kill player if not colleted the locks"
				If(Event Player.BounceLockMax_Cache && Count Of(Event Player.LockCollected) < Event Player.BounceLockMax_Cache);
					Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
						? Custom String("   ! 进点前需收集齐所有黄弹球 !") : Custom String("   ! collect ALL orange orbs to unlock !"));
					Kill(Event Player, Null);
					Skip(61);
				End;
				If(Event Player.ban_climb && Event Player.J);
					Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
						? Custom String("   爬墙 ↑ 已禁用!") : Custom String("   Climb ↑ is banned!"));
					Call Subroutine(checkpointFailReset);
					Skip(56);
				End;
				If(Event Player.ban_bhop && !(Event Player.O == 0 || Event Player.CH == Color(Green)));
					Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
						? Custom String("   ≥ 留小跳进点!") : Custom String("   ≥ You need to have a bhop to complete!"));
					Call Subroutine(checkpointFailReset);
					Skip(51);
				End;
				Event Player.LockCollected = Empty Array;
				Event Player.A += 1;
				Call Subroutine(UpdateCache);
				"remove ult feature disabled for speedruning purposes\r\nif eventPlayer.isUsingUltimate() and not eventPlayer.CurrentCheckpoint in BladeEnabledCheckpoints:\r\n    kill(eventPlayer, null)\r\n teleport cps"
				If(Count Of(Global.A[Event Player.A]) > 1);
					Start Forcing Player Position(Event Player, Last Of(Global.A[Event Player.A]), False);
					Wait(0.100, Ignore Condition);
					Event Player.flytoggle = Null;
					Stop Forcing Player Position(Event Player);
				End;
				If(Event Player.splitdisplay != -999);
					Event Player.splitdisplay = (Event Player.PracticeToggle ? Event Player.practicetimer : Event Player.D) - Event Player.splittime;
				End;
				Wait(0.016, Ignore Condition);
				Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
				Play Effect(Global.CompMode || Event Player.invis ? Event Player : All Players(All Teams), Ring Explosion, Color(Sky Blue),
					Global.A[Event Player.A] + Vector(0, 1.500, 0), 4);
				"bigMessage(eventPlayer, \"Arrived at {0} / {1}{2}\".format(eventPlayer.CurrentCheckpoint, len(CheckpointPositions) - 1, \" - Split {}\".format(eventPlayer.splitdisplay) if eventPlayer.splitson else \"\"))"
				Big Message(Event Player, Custom String("{0} {1}", String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
					== Custom String("玫红") ? Custom String("抵达检查点") : Custom String("Arrived at level"), Event Player.A));
				Wait(0.016, Ignore Condition);
				Call Subroutine(UpdateTitle);
				If(Event Player.PracticeToggle);
					Event Player.splittime = Event Player.practicetimer;
					Skip(29);
				End;
				Event Player.splittime = Event Player.D;
				"complete lvl"
				If(Event Player.A == Count Of(Global.A) - 1 && !Event Player.EditorOn && !Event Player.PracticeToggle);
					Stop Chasing Player Variable(Event Player, D);
					Stop Chasing Player Variable(Event Player, practicetimer);
					Wait(0.016, Ignore Condition);
					Big Message(All Players(All Teams), Custom String("{0} {1} {2}", Event Player, String("Capture") == Custom String("捕捉")
						|| Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("已通关! 用时 ") : Custom String(
						"Mission complete! Time"), Custom String("{0} {1}", Event Player.D, String("Capture") == Custom String("捕捉") || Custom String(
						"{0}", Color(Rose)) == Custom String("玫红") ? Custom String("秒") : Custom String("sec"))));
					Call Subroutine(DeleteSave);
					Call Subroutine(Leaderboardupdate);
					If(Global.CompMode && Global.CompAtmpNum > 0);
						If(Event Player.AttemptCount == Global.CompAtmpNum);
							Global.CompAtmpSaveCount[Index Of Array Value(Global.CompAtmpSaveNames, Custom String("{0}", Event Player))] = -1;
							Event Player.AttemptCount = -1;
							Event Player.CompDone = True;
							Event Player.LeaderboardToggle = True;
							Disable Built-In Game Mode Respawning(Event Player);
							Kill(Event Player, Null);
						Else;
							Global.CompAtmpSaveCount[Index Of Array Value(Global.CompAtmpSaveNames, Custom String("{0}", Event Player))
								] = Event Player.AttemptCount + 1;
						End;
					End;
				"update save"
				Else;
					Call Subroutine(DeleteSave);
					Call Subroutine(MakeSave);
				End;
			Else If(Distance Between(Event Player, Last Of(Global.A[Event Player.A])) > 1.400);
				"ground reset ----------------------------------------------------------------------------------------------------"
				Call Subroutine(checkpointFailReset);
			End;
		End;
		Wait(0.048, Ignore Condition);
		Loop If Condition Is True;
	}
}

rule("reset collected locks when landing back on cp")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.LockCollected != Empty Array;
		Is On Ground(Event Player) == True;
		Distance Between(Event Player, Last Of(Global.A[Event Player.A])) <= 1.400;
	}

	actions
	{
		Event Player.LockCollected = Empty Array;
	}
}

rule("Kill Orb | Activate")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.KillPosition_Cache != Empty Array;
		Event Player.C == False;
		Event Player.NotOnLastCp != False;
		Is True For Any(Event Player.KillPosition_Cache, Distance Between(Current Array Element, Event Player)
			<= Event Player.KillRadii_Cache[Index Of Array Value(Event Player.KillPosition_Cache, Current Array Element)]) == True;
	}

	actions
	{
		Call Subroutine(checkpointFailReset);
	}
}

rule("Bounce Ball / Orb | Activate")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.BouncePosition_Cache != Empty Array;
		"@Condition eventPlayer.NotOnLastCp # disabled coz editor"
		Is True For Any(Event Player.BouncePosition_Cache, Distance Between(Current Array Element, Position Of(Event Player) + Vector(0,
			0.700, 0)) < 1.400) == True;
	}

	actions
	{
		Event Player.bouncetouched = Index Of Array Value(Event Player.BouncePosition_Cache, First Of(Sorted Array(Filtered Array(
			Event Player.BouncePosition_Cache, Distance Between(Event Player + Vector(0, 0.700, 0), Current Array Element)
			< 1.400 && !Array Contains(Event Player.LockCollected, Current Array Element)), Distance Between(Event Player,
			Current Array Element))));
		"prevent same one trigering twice in a row"
		If(Event Player.bouncetouched == Event Player.bouncetouchedlast);
			Wait(0.240, Ignore Condition);
			"-1 because null becomes 0 and thats a legit index"
			Event Player.bouncetouchedlast = -1;
			Loop If Condition Is True;
			"only return if no others in radius"
			Abort;
		End;
		Event Player.bouncetouchedlast = Event Player.bouncetouched;
		If(Event Player.BounceStrength_Cache[Event Player.bouncetouched] != 0);
			Apply Impulse(Event Player, Up, Event Player.BounceStrength_Cache[Event Player.bouncetouched], To World, Cancel Contrary Motion);
		End;
		If(Event Player.BounceUlt_Cache[Event Player.bouncetouched]);
			Set Ultimate Ability Enabled(Event Player, True);
			Set Ultimate Charge(Event Player, 100);
			Small Message(Event Player, Custom String("   {0} {1} ", Ability Icon String(Hero(Genji), Button(Ultimate)), String("Capture")
				== Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("#终极技能已就绪") : Custom String(
				"Ultimate is ready")));
			Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
		End;
		If(Event Player.BounceLock_Cache[Event Player.bouncetouched]);
			Modify Player Variable(Event Player, LockCollected, Append To Array,
				Event Player.BouncePosition_Cache[Event Player.bouncetouched]);
			Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
				? Custom String("   黄球已收集") : Custom String("   orb has been collected"));
			Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
		End;
		If(Event Player.BounceDash_Cache[Event Player.bouncetouched]);
			If(Is Using Ability 1(Event Player));
				Wait Until(!Is Using Ability 1(Event Player), 1);
				"wait til set false by check"
				Wait(0.032, Ignore Condition);
			End;
			Set Ability 1 Enabled(Event Player, True);
			Small Message(Event Player, Custom String("   {0} {1} ", Ability Icon String(Hero(Genji), Button(Ability 1)), String("Capture")
				== Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("技能1影已就绪") : Custom String(
				"Dash is ready")));
			Play Effect(Event Player, Buff Explosion Sound, Color(White), Event Player, 75);
		End;
		Wait(0.240, Ignore Condition);
		Loop If Condition Is True;
		Event Player.bouncetouchedlast = -1;
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
		Event Player.F == False;
		Event Player.CompDone == False;
	}

	actions
	{
		Clear Status(Event Player, Phased Out);
		Resurrect(Event Player);
		Call Subroutine(checkpointFailReset);
		"rest is to prevent dead spaming from crashign server\r\n but doing waits only when needed"
		Wait Until(Is Alive(Event Player), 1);
		Wait Until(Is Dead(Event Player), 1);
		If(Is Dead(Event Player) && !Event Player.F && !Event Player.CompDone);
			Wait(0.160, Ignore Condition);
			Clear Status(Event Player, Phased Out);
			Resurrect(Event Player);
			Call Subroutine(checkpointFailReset);
			Wait Until(Is Alive(Event Player), 1);
			Wait Until(Is Dead(Event Player), 1);
			If(Is Dead(Event Player) && !Event Player.F && !Event Player.CompDone);
				Wait(0.440, Ignore Condition);
				Clear Status(Event Player, Phased Out);
				Resurrect(Event Player);
				Call Subroutine(checkpointFailReset);
				Wait Until(Is Alive(Event Player), 1);
				Wait Until(Is Dead(Event Player), 1);
				If(Is Dead(Event Player) && !Event Player.F && !Event Player.CompDone);
					Wait(0.640, Ignore Condition);
					Clear Status(Event Player, Phased Out);
					Resurrect(Event Player);
					Call Subroutine(checkpointFailReset);
	}
}

rule("Player Phase")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Has Status(Event Player, Phased Out) == False;
		Is Alive(Event Player) == True;
	}

	actions
	{
		"delay if its for afk sleep"
		If(Has Status(Event Player, Invincible));
			Wait(0.160, Ignore Condition);
		End;
		Set Status(Event Player, Null, Phased Out, 9999);
		Set Status(Event Player, Null, Invincible, 9999);
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
		"delete if player didnt do first cp"
		If(Global.SaveCp[Index Of Array Value(Global.SaveEnt, Event Player)] == 0);
			Call Subroutine(DeleteSave);
		Else;
			Skip If(Global.SaveCp[Index Of Array Value(Global.SaveEnt, Event Player)] >= Count Of(Global.A)
				- 1 || Global.SavePauseEnabled[Index Of Array Value(Global.SaveEnt, Event Player)], 1);
			Global.SaveTimer[Index Of Array Value(Global.SaveEnt, Event Player)
				] = Total Time Elapsed - Global.SaveElapsed[Index Of Array Value(Global.SaveEnt, Event Player)
				] - Global.SavePauseTime[Index Of Array Value(Global.SaveEnt, Event Player)] + Global.SaveTimer[Index Of Array Value(
				Global.SaveEnt, Event Player)];
			Global.SavePauseTime[Index Of Array Value(Global.SaveEnt, Event Player)] = 0;
			Global.SavePauseEnabled[Index Of Array Value(Global.SaveEnt, Event Player)] = False;
	}
}

rule("AFK timer")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Moving(Event Player) == False;
		Is Alive(Event Player) == True;
		Event Player.EditorOn == False;
	}

	actions
	{
		Wait(90, Abort When False);
		"raycast to prevent camera stuck on low wall"
		Start Camera(Event Player, Position Of(Event Player) + Up * (Distance Between(Position Of(Event Player), Ray Cast Hit Position(
			Position Of(Event Player), Position Of(Event Player) + Vector(0, 4, 0), Null, Null, False)) - 1), Position Of(Event Player),
			10);
		"clear status to apply sleep, auto re-aply via normal aply rule"
		Clear Status(Event Player, Phased Out);
		Wait(0.016, Ignore Condition);
		Clear Status(Event Player, Invincible);
		Wait(0.016, Ignore Condition);
		Set Status(Event Player, Null, Asleep, 9999);
		"cancel it after jumping or not sleep, reset cures sleep"
		Wait Until(Is Button Held(Event Player, Button(Jump)) || !Has Status(Event Player, Asleep), 99999);
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

rule("Huds: Global/Localplayer")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Wait(2, Ignore Condition);
		"name/credit construction"
		If(Global.Name != Custom String("name here - 作者") || First Of(Global.Cachedcredits) == Null);
			Global.Cachedcredits[0] = Global.Name;
		End;
		If(Global.Code != Custom String("code here - 代码") || Global.Cachedcredits[1] == Null);
			Global.Cachedcredits[1] = Global.Code;
		End;
		Global.Name = Null;
		Global.Code = Null;
		Create HUD Text(All Players(All Teams), Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
			== Custom String("玫红") ? Custom String("作者: {0}", First Of(Global.Cachedcredits)) : Custom String("Made by: {0}", First Of(
			Global.Cachedcredits)), Left, -200, Null, Null, Color(Violet), Visible To and String, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		Create HUD Text(All Players(All Teams), Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
			== Custom String("玫红") ? Custom String("代码: {0}", Global.Cachedcredits[1]) : Custom String("Map code: {0}",
			Global.Cachedcredits[1]), Left, -199, Null, Null, Color(Sky Blue), Visible To and String, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		Create HUD Text(Local Player.K ? Local Player : Null, Null, Null, Custom String("Discord: dsc.gg/genjiparkour"), Left, -198, Null,
			Null, Color(Aqua), Visible To, Default Visibility);
		"global huds"
		Create HUD Text(All Players(All Teams), Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
			== Custom String("玫红") ? Custom String("房间将在 {0} 分钟后重启 - V{1}", Global.TimeRemaining, Custom String("1.8.1")) : Custom String(
			"Server Restarts In {0} Min - V{1}", Global.TimeRemaining, Custom String("1.8.1")), Null, Right, -161, Null, Color(Red), Null,
			Visible To and String, Visible Always);
		"padding for custom hud display"
		Create HUD Text(All Players(All Teams), Null, Null, Custom String(
			"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nv"), Top, -163, Null, Null, Color(
			Orange), Visible To, Default Visibility);
		Create HUD Text(Local Player.K ? Local Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}",
			Color(Rose)) == Custom String("玫红") ? Custom String("{0}+{1}+{2}", Input Binding String(Button(Crouch)), Input Binding String(
			Button(Ability 2)), Custom String("{0} | 重新开始\n长按 {1} | 完整成绩排名", Input Binding String(Button(Interact)), Input Binding String(
			Button(Melee)))) : Custom String("{0}+{1}+{2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 2)),
			Custom String("{0} | Restart\nHold {1} | leaderboard", Input Binding String(Button(Interact)), Input Binding String(Button(
			Melee)))), Right, -160, Null, Null, Color(White), Visible To and String, Default Visibility);
		Create HUD Text(Local Player.K ? Local Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}",
			Color(Rose)) == Custom String("玫红") ? Custom String("{0} {1} |  {2}", Local Player.quick_restart ? Custom String("")
			: Custom String("长按"), Input Binding String(Button(Reload)), Local Player.quick_restart ? Custom String("快速回点 | 启用")
			: Custom String("启用快速回点")) : Custom String("{0} {1} |  {2}", Local Player.quick_restart ? Custom String("") : Custom String(
			"Hold"), Input Binding String(Button(Reload)), Local Player.quick_restart ? Custom String("Quick reset") : Custom String(
			"Enable Quick reset")), Right, -158, Null, Null, Color(White), Visible To and String, Default Visibility);
		Create HUD Text(Local Player.K ? Local Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}",
			Color(Rose)) == Custom String("玫红") ? Custom String("{0}+{1} | 探点模式{2}", Input Binding String(Button(Reload)),
			Input Binding String(Button(Melee)), Local Player.C ? Custom String(" | 启用") : Custom String("")) : Custom String(
			"{0}+{1} | Invincible{2}", Input Binding String(Button(Reload)), Input Binding String(Button(Melee)),
			Local Player.C ? Custom String(" | ON") : Custom String("")), Right, -159, Null, Null, Local Player.C ? Color(Green) : Color(
			White), Visible To String and Color, Default Visibility);
		Create HUD Text(All Players(All Teams), Null, Local Player.K ? Custom String("") : Custom String("{0}{1}{2}",
			Local Player.C ? Ability Icon String(Hero(Baptiste), Button(Ability 2)) : Custom String(""),
			Local Player.PracticeToggle ? Ability Icon String(Hero(D.Va), Button(Ultimate)) : Custom String(""),
			Local Player.invis ? Ability Icon String(Hero(Sombra), Button(Ability 1)) : Custom String("")), String("Capture")
			== Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("长按 {0} | 切换显示HUD",
			Input Binding String(Button(Secondary Fire))) : Custom String("Hold {0} | toggle hud", Input Binding String(Button(
			Secondary Fire))), Right, -155, Color(White), Color(White), Color(White), Visible To and String, Default Visibility);
		Create HUD Text(Local Player.K ? Local Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}",
			Color(Rose)) == Custom String("玫红") ? Custom String("长按 {0} | 预览弹球/传送门", Input Binding String(Button(Primary Fire)))
			: Custom String("Hold {0} | Preview orb/portal", Input Binding String(Button(Primary Fire))), Right, -153, Null, Null,
			Local Player.PreviewsArray ? Color(Green) : Color(White), Visible To String and Color, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		Create HUD Text(Local Player.PreviewsArray && Local Player.K ? Local Player : Null, Null, String("Capture") == Custom String("捕捉")
			|| Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("移动键 左/右 ↔| 预览其他\n视角移动 | 调整浏览视角") : Custom String(
			"Walk left/right ↔| preview others\nAim | change preview angle"), Null, Right, -152, Null, Color(Lime Green), Null,
			Visible To and String, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		Create HUD Text(All Players(All Teams), Null, Null, Local Player.splitdisplay == -999 ? Custom String("") : (String("Capture")
			== Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? (Local Player.F ? Custom String("")
			: Custom String("单关用时 {0}", Local Player.splitdisplay)) : (Local Player.F ? Custom String("") : Custom String("Split: {0}",
			Local Player.splitdisplay))), Left, -195, Null, Null, Color(White), Visible To and String, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		Call Subroutine(CreateLeaderBoard);
		"text per checkpoint  text per cp each"
		If(Global.CpHudText != Null);
			"hudSubtext(getAllPlayers(), \"                                                   \\r\\n  \\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\", HudPosition.TOP, HO.filler_custommsg, Color.ORANGE, HudReeval.VISIBILITY, SpecV"
			Create HUD Text(All Players(All Teams), Array Contains(Global.CpHudCp, Local Player.A)
				&& Local Player.K ? Global.CpHudText[Index Of Array Value(Global.CpHudCp, Local Player.A)] : Custom String(""), String(
				"Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? (Array Contains(Global.CpHudCp,
				Local Player.A) && !Local Player.K ? Custom String("(文本已隐藏)") : Custom String("")) : (Array Contains(Global.CpHudCp,
				Local Player.A) && !Local Player.K ? Custom String("(text hidden)") : Custom String("")), Null, Top, -171, Color(Blue), Color(
				Blue), Color(Blue), Visible To and String, Default Visibility);
		End;
		If(Global.CpIwtText != Null);
			Create In-World Text(All Players(All Teams), Array Contains(Global.CpIwtCp, Local Player.A)
				? Global.CpIwtText[Index Of Array Value(Global.CpIwtCp, Local Player.A)] : Custom String(""),
				Global.CpIwtPos[Index Of Array Value(Global.CpIwtCp, Local Player.A)], 2, Clip Against Surfaces,
				Visible To Position and String, Global.CpIwtColor, Default Visibility);
		End;
		If(Global.CompMode);
			Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.instructionhud), Custom String(
				"                                                                                                                           "),
				Null, Null, Top, -182, Color(White), Null, Null, Visible To, Default Visibility);
			If(First Of(Global.instructiontext));
				Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.instructionhud), Null, Null, First Of(
					Global.instructiontext), Top, -181, Null, Null, Color(White), Visible To, Default Visibility);
			End;
			If(Global.instructiontext[1]);
				Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.instructionhud), Null, Null,
					Global.instructiontext[1], Top, -180, Null, Null, Color(White), Visible To, Default Visibility);
			End;
			If(Global.instructiontext[2]);
				Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.instructionhud), Null, Null,
					Global.instructiontext[2], Top, -179, Null, Null, Color(White), Visible To, Default Visibility);
			End;
			If(Global.instructiontext[3]);
				Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.instructionhud), Null, Null,
					Global.instructiontext[3], Top, -178, Null, Null, Color(White), Visible To, Default Visibility);
			End;
			Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.instructionhud), Custom String(
				"                                   Press {0} to start                                ", Input Binding String(Button(
				Interact))), Null, Null, Top, -177, Color(White), Null, Null, Visible To and String, Default Visibility);
		Else If(!Global.CompMode);
			Create HUD Text(Local Player.K ? Local Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}",
				Color(Rose)) == Custom String("玫红") ? Custom String("长按 {0} | 观战模式{1}", Input Binding String(Button(Interact)),
				Local Player.F ? Custom String(" | 启用") : Custom String("")) : Custom String("Hold {0} | Spectate{1}", Input Binding String(
				Button(Interact)), Local Player.F ? Custom String(" | ON") : Custom String("")), Right, -157, Null, Null,
				Local Player.F ? Color(Green) : Color(White), Visible To String and Color, Default Visibility);
			Create HUD Text(Local Player.K ? Local Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}",
				Color(Rose)) == Custom String("玫红") ? Custom String("长按  {0} | 隐身模式{1}", Input Binding String(Button(Ability 2)),
				Local Player.invis ? Custom String(" | 启用") : Custom String("")) : Custom String("Hold {0} | invisible{1}",
				Input Binding String(Button(Ability 2)), Local Player.invis ? Custom String(" | ON") : Custom String("")), Right, -156, Null,
				Null, Local Player.invis ? Color(Green) : Color(White), Visible To String and Color, Default Visibility);
			Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
			Create HUD Text(Local Player.K ? Local Player : Null, Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}",
				Color(Rose)) == Custom String("玫红") ? Custom String("{0} + {1} | 练习模式{2}", Input Binding String(Button(Ultimate)),
				Input Binding String(Button(Melee)), Local Player.PracticeToggle ? Custom String(" | ({0})", Local Player.PracticeCheckpoint)
				: Custom String("")) : Custom String("{0} + {1} | Practice{2}", Input Binding String(Button(Ultimate)), Input Binding String(
				Button(Melee)), Local Player.PracticeToggle ? Custom String(" | ({0})", Local Player.PracticeCheckpoint) : Custom String("")),
				Right, -151, Null, Null, Local Player.PracticeToggle ? Color(Green) : (Local Player.C ? Color(Gray) : Color(White)),
				Visible To String and Color, Default Visibility);
			Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
			Create HUD Text(Filtered Array(All Players(All Teams), Current Array Element.PracticeToggle && Current Array Element.K), Null,
				String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String(
				"{0} + {1} + {2}", Input Binding String(Button(Crouch)), Input Binding String(Button(Ability 1)), Custom String(
				"{0} | 下一关\n{1} + {2}", Input Binding String(Button(Primary Fire)), Input Binding String(Button(Crouch)), Custom String(
				"{0} + {1} | 上一关\n{2} | 回到练习模式起点 ", Input Binding String(Button(Ability 1)), Input Binding String(Button(Secondary Fire)),
				Input Binding String(Button(Interact))))) : Custom String("{0} + {1} + {2}", Input Binding String(Button(Crouch)),
				Input Binding String(Button(Ability 1)), Custom String("{0} | Next level\n{1} + {2}", Input Binding String(Button(
				Primary Fire)), Input Binding String(Button(Crouch)), Custom String(
				"{0} + {1} | Previous level\n{2} | Start from practice cp ", Input Binding String(Button(Ability 1)), Input Binding String(
				Button(Secondary Fire)), Input Binding String(Button(Interact))))), Null, Right, -150, Null, Color(Lime Green), Null,
				Visible To String and Color, Default Visibility);
			Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
		End;
		If(!Host Player.EditorOn);
			"find the value"
			Global.Difficultyhud = Array(Workshop Setting Combo(Custom String("map settings \n地图设置"), Custom String(
				"difficulty (display hud) - 难度(显示hud)"), ${difficultyhud}, Array(Custom String("beginner"), Custom String("easy-"), Custom String("easy"),
				Custom String("easy+"), Custom String("medium-"), Custom String("medium"), Custom String("medium+"), Custom String("hard-"),
				Custom String("hard"), Custom String("hard+"), Custom String("very hard-"), Custom String("very hard"), Custom String(
				"very hard+"), Custom String("extreme-"), Custom String("extreme"), Custom String("extreme+"), Custom String("hell"),
				Custom String("don't display - 不显示"), Custom String("Playtest - 游戏测试")), 0), Workshop Setting Toggle(Custom String(
				"map settings \n地图设置"), Custom String("Playtest display - 游戏测试"), ${playteston}, 0));
			"display\r\n 17th entry is 'dont display'"
			If(First Of(Global.Difficultyhud) != 17);
				Create HUD Text(Local Player.K && !Local Player.LeaderboardToggle ? Local Player : Null, Global.Difficultyhud[1] ? (String(
					"Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("游戏测试")
					: Custom String("Playtest")) : Custom String(""), Array(Custom String("beginner"), Custom String("easy -"), Custom String(
					"easy"), Custom String("easy +"), Custom String("medium -"), Custom String("medium"), Custom String("medium +"), Custom String(
					"hard -"), Custom String("hard"), Custom String("hard +"), Custom String("very hard -"), Custom String("very hard"),
					Custom String("very hard +"), Custom String("extreme -"), Custom String("extreme"), Custom String("extreme +"), Custom String(
					"hell"), Null, Custom String("playtest"))[First Of(Global.Difficultyhud)], Null, Top, -174, Color(Blue), Array(Color(Green),
					Color(Lime Green), Color(Lime Green), Color(Lime Green), Color(Yellow), Color(Yellow), Color(Yellow), Color(Orange), Color(
					Orange), Color(Orange), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Custom Color(255, 69, 0, 255), Color(
					Red), Color(Red), Color(Red), Custom Color(150, 0, 0, 255), Null, Color(Blue))[First Of(Global.Difficultyhud)], Color(Blue),
					Visible To and String, Default Visibility);
				Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
	}
}

rule("Huds: each player")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	actions
	{
		"ban icons in level"
		Create HUD Text(Event Player, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String(
			"玫红") ? (Event Player.PracticeToggle ? Custom String("练习用时 {0}", Custom String("{0} {1}", Event Player.practicetimer, String(
			"Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("秒")
			: Custom String("sec"))) : Custom String("")) : (Event Player.PracticeToggle ? Custom String("Practice Time {0}",
			Custom String("{0} {1}", Event Player.practicetimer, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(
			Rose)) == Custom String("玫红") ? Custom String("秒") : Custom String("sec"))) : Custom String("")), String("Capture")
			== Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("用时 {0}", Custom String(
			"{0} {1}", Event Player.D, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("秒") : Custom String("sec"))) : Custom String("Time {0}", Custom String("{0} {1}", Event Player.D, String(
			"Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("秒")
			: Custom String("sec"))), Left, -196, Color(White), Color(Gray), Color(White), String, Default Visibility);
		Create HUD Text(Event Player.LeaderboardToggle ? Null : Event Player, Null, String("Capture") == Custom String("捕捉")
			|| Custom String("{0}", Color(Rose)) == Custom String("玫红") ? (Event Player.BounceLockMax_Cache ? Custom String(
			"黄弹球 {0} / {1}", Count Of(Event Player.LockCollected), Event Player.BounceLockMax_Cache) : Custom String("")) : (
			Event Player.BounceLockMax_Cache ? Custom String("orange orbs {0} / {1}", Count Of(Event Player.LockCollected),
			Event Player.BounceLockMax_Cache) : Custom String("")), Custom String("{0}{1}{2}",
			Event Player.banstring ? Event Player.banstring : Custom String(""), Event Player.banstring ? Custom String("\n")
			: Custom String(""), Custom String("{0} {1} / {2}", String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(
			Rose)) == Custom String("玫红") ? Custom String("检查点") : Custom String("Level"), Event Player.A, Count Of(Global.A) - 1)), Top,
			-173, Color(White), Color(Orange), Color(White), Visible To and String, Default Visibility);
		"climb/bhop indicators"
		Create HUD Text(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("{0}{1}", Event Player.J ? Custom String("爬墙已用") : Custom String("爬墙未用"),
			Event Player.climbNum < 1 ? Custom String("") : Custom String(" ({0})", Event Player.climbNum)) : Custom String("Climb{0}",
			Event Player.climbNum < 1 ? Custom String("") : Custom String(" ({0})", Event Player.climbNum)), Null, Null, Left, -193,
			Event Player.J ? Color(Red) : Color(Green), Null, Null, String and Color, Default Visibility);
		Create HUD Text(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? (Event Player.O == 0 || Event Player.CH == Color(Green) ? Custom String("小跳未用") : Custom String("小跳已用")) : Custom String(
			"Bhop"), Null, Null, Left, -194, Event Player.O == 0 ? Color(Green) : Event Player.CH, Null, Null, String and Color,
			Default Visibility);
		Wait(3, Ignore Condition);
		If(Global.CompMode);
			Create HUD Text(Event Player, Custom String(" "), String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
				== Custom String("玫红") ? (Global.CompTime <= 0 ? Custom String("! 比赛结束 !") : Custom String("剩余时间: {0} 分钟{1}", Global.CompTime,
				Event Player.AttemptCount == -1 ? Custom String("\n你没有尝试过") : (Global.CompAtmpNum > 0 ? Custom String("\n尝试 {0} / {1}",
				Event Player.AttemptCount, Global.CompAtmpNum) : Custom String("")))) : (Global.CompTime <= 0 ? Custom String(
				"! competition is over !") : Custom String("time left: {0} min{1}", Global.CompTime,
				Event Player.AttemptCount == -1 ? Custom String("\nYou are out of attemps") : (Global.CompAtmpNum > 0 ? Custom String(
				"\nAttempt {0} / {1}", Event Player.AttemptCount, Global.CompAtmpNum) : Custom String("")))), String("Capture")
				== Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? (Global.CompTime > 0 ? Custom String(
				"竞赛模式") : Custom String("竞赛模式\n\n\n")) : (Global.CompTime > 0 ? Custom String("competitive mode") : Custom String(
				"competitive mode\n\n\n")), Top, -183, Color(Yellow), Color(Yellow), Color(Yellow), String, Default Visibility);
	}
}

rule("Huds: remake leaderboard")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		Global.LeaderBoardRemake != False;
	}

	actions
	{
		"account for delay in completion"
		Wait(0.016, Ignore Condition);
		Global.LeaderBoardFull = Sorted Array(Global.LeaderBoardFull, Current Array Element[1]);
		While(Count Of(Global.LeaderBoardHuds) > 0);
			Destroy HUD Text(First Of(Global.LeaderBoardHuds));
			Modify Global Variable(LeaderBoardHuds, Remove From Array By Index, 0);
		End;
		"top 5"
		If(First Of(Global.LeaderBoardFull));
			Create HUD Text(All Players(All Teams), Null, Null, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose))
				== Custom String("玫红") ? Custom String(" \n{0} 排名前5 {0}", Ability Icon String(Hero(Genji), Button(Primary Fire)))
				: Custom String(" \n{0} Top 5 {0}", Ability Icon String(Hero(Genji), Button(Primary Fire))), Right, -146, Null, Null, Color(
				White), Visible To and String, Default Visibility);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
			Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(First Of(Global.LeaderBoardFull)), First Of(
				Global.LeaderBoardFull)[2], Right, -145, Color(Red), Color(Red), Color(Red), Visible To, Default Visibility);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		End;
		If(Global.LeaderBoardFull[1]);
			Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Global.LeaderBoardFull[1]),
				Global.LeaderBoardFull[1][2], Right, -144, Color(Orange), Color(Orange), Color(Orange), Visible To, Default Visibility);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		End;
		If(Global.LeaderBoardFull[2]);
			Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Global.LeaderBoardFull[2]),
				Global.LeaderBoardFull[2][2], Right, -143, Color(Yellow), Color(Yellow), Color(Yellow), Visible To, Default Visibility);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		End;
		If(Global.LeaderBoardFull[3]);
			Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Global.LeaderBoardFull[3]),
				Global.LeaderBoardFull[3][2], Right, -142, Color(Lime Green), Color(Lime Green), Color(Lime Green), Visible To,
				Default Visibility);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		End;
		If(Global.LeaderBoardFull[4]);
			Create HUD Text(All Players(All Teams), Hero Icon String(Hero(Genji)), First Of(Global.LeaderBoardFull[4]),
				Global.LeaderBoardFull[4][2], Right, -141, Color(Green), Color(Green), Color(Green), Visible To, Default Visibility);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		End;
		Create HUD Text(Evaluate Once(Global.CompMode && Global.CompTime == 0) ? All Players(All Teams) : Local Player.LeaderboardToggle,
			Custom String("　　　　 {0} {1} {0} 　　　", Icon String(Flag), String("Capture") == Custom String("捕捉") || Custom String("{0}",
			Color(Rose)) == Custom String("玫红") ? Custom String("成绩排名") : Custom String("Leaderboard")), Null, Null, Top, -168, Color(
			Blue), Null, Null, Visible To and String, Visible Never);
		Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		Create HUD Text(Evaluate Once(Global.CompMode && Global.CompTime == 0) ? All Players(All Teams) : Local Player.LeaderboardToggle,
			Custom String("　　　　　　　　　　　　　　　　　　\n　 1:　{0} - {1}　\n　 2:　{2}", First Of(Global.LeaderBoardFull) ? First Of(First Of(
			Global.LeaderBoardFull)) : Custom String(""), First Of(Global.LeaderBoardFull) ? First Of(Global.LeaderBoardFull)
			[2] : Custom String(""), Custom String("{0} - {1}　\n　 3:　{2}", Global.LeaderBoardFull[1] ? First Of(Global.LeaderBoardFull[1])
			: Custom String(""), Global.LeaderBoardFull[1] ? Global.LeaderBoardFull[1][2] : Custom String(""), Custom String(
			"{0} - {1}　\n　 4:　{2}", Global.LeaderBoardFull[2] ? First Of(Global.LeaderBoardFull[2]) : Custom String(""),
			Global.LeaderBoardFull[2] ? Global.LeaderBoardFull[2][2] : Custom String(""), Custom String("{0} - {1}　\n　 5:　{2}",
			Global.LeaderBoardFull[3] ? First Of(Global.LeaderBoardFull[3]) : Custom String(""),
			Global.LeaderBoardFull[3] ? Global.LeaderBoardFull[3][2] : Custom String(""), Custom String("{0} - {1}\n",
			Global.LeaderBoardFull[4] ? First Of(Global.LeaderBoardFull[4]) : Custom String(""),
			Global.LeaderBoardFull[4] ? Global.LeaderBoardFull[4][2] : Custom String("")))))), Null, Null, Top, -167, Color(White), Null,
			Null, Visible To, Default Visibility);
		Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		If(Global.LeaderBoardFull[5]);
			Create HUD Text(Evaluate Once(Global.CompMode && Global.CompTime == 0) ? All Players(All Teams) : Local Player.LeaderboardToggle,
				Custom String("　　　　　　　　　　　　　　　　　　\n　 6:　{0} - {1}　\n　 7:　{2}", Global.LeaderBoardFull[5] ? First Of(Global.LeaderBoardFull[5])
				: Custom String(""), Global.LeaderBoardFull[5] ? Global.LeaderBoardFull[5][2] : Custom String(""), Custom String(
				"{0} - {1}　\n　 8:　{2}", Global.LeaderBoardFull[6] ? First Of(Global.LeaderBoardFull[6]) : Custom String(""),
				Global.LeaderBoardFull[6] ? Global.LeaderBoardFull[6][2] : Custom String(""), Custom String("{0} - {1}　\n　 9:　{2}",
				Global.LeaderBoardFull[7] ? First Of(Global.LeaderBoardFull[7]) : Custom String(""),
				Global.LeaderBoardFull[7] ? Global.LeaderBoardFull[7][2] : Custom String(""), Custom String("{0} - {1}　\n　10:　{2}",
				Global.LeaderBoardFull[8] ? First Of(Global.LeaderBoardFull[8]) : Custom String(""),
				Global.LeaderBoardFull[8] ? Global.LeaderBoardFull[8][2] : Custom String(""), Custom String("{0} - {1}\n",
				Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[9]) : Custom String(""),
				Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[9][2] : Custom String("")))))), Null, Null, Top, -166, Color(White), Null,
				Null, Visible To, Default Visibility);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		End;
		If(Global.LeaderBoardFull[10]);
			Create HUD Text(Evaluate Once(Global.CompMode && Global.CompTime == 0) ? All Players(All Teams) : Local Player.LeaderboardToggle,
				Custom String("　　　　　　　　　　　　　　　　　　\n　11:　{0} - {1}　\n　12:　{2}", Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[10])
				: Custom String(""), Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[10][2] : Custom String(""), Custom String(
				"{0} - {1}　\n　13:　{2}", Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[11]) : Custom String(""),
				Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[11][2] : Custom String(""), Custom String("{0} - {1}　\n　14:　{2}",
				Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[12]) : Custom String(""),
				Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[12][2] : Custom String(""), Custom String("{0} - {1}　\n　15:　{2}",
				Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[13]) : Custom String(""),
				Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[13][2] : Custom String(""), Custom String("{0} - {1}\n",
				Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[14]) : Custom String(""),
				Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[14][2] : Custom String("")))))), Null, Null, Top, -165, Color(White), Null,
				Null, Visible To, Default Visibility);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
		End;
		If(Global.LeaderBoardFull[15]);
			Create HUD Text(Evaluate Once(Global.CompMode && Global.CompTime == 0) ? All Players(All Teams) : Local Player.LeaderboardToggle,
				Custom String("　　　　　　　　　　　　　　　　　　\n　16:　{0} - {1}　\n　17:　{2}", Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[15])
				: Custom String(""), Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[15][2] : Custom String(""), Custom String(
				"{0} - {1}　\n　18:　{2}", Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[16]) : Custom String(""),
				Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[16][2] : Custom String(""), Custom String("{0} - {1}　\n　19:　{2}",
				Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[17]) : Custom String(""),
				Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[17][2] : Custom String(""), Custom String("{0} - {1}　\n　20:　{2}",
				Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[18]) : Custom String(""),
				Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[18][2] : Custom String(""), Custom String("{0} - {1}\n",
				Global.LeaderBoardFull[9] ? First Of(Global.LeaderBoardFull[19]) : Custom String(""),
				Global.LeaderBoardFull[9] ? Global.LeaderBoardFull[19][2] : Custom String("")))))), Null, Null, Top, -164, Color(White), Null,
				Null, Visible To, Default Visibility);
			Modify Global Variable(LeaderBoardHuds, Append To Array, Last Text ID);
	}
}

rule("Tittle ")
{
	event
	{
		Subroutine;
		UpdateTitle;
	}

	actions
	{
		Abort If(Global.TitleData == Null || Global.CompMode || Event Player.PracticeToggle || Event Player.EditorOn || !Array Contains(
			First Of(Global.TitleData), Event Player.A));
		Destroy In-World Text(Event Player.TitleStore);
		Create In-World Text(Event Player.invis ? Null : All Players(All Teams), Global.TitleData[1][Index Of Array Value(First Of(
			Global.TitleData), Event Player.A)], Event Player, 1.100, Clip Against Surfaces, Visible To and Position,
			Global.TitleData[2][Index Of Array Value(First Of(Global.TitleData), Event Player.A)], Default Visibility);
		Event Player.TitleStore = Last Text ID;
	}
}

disabled rule("------------------------------------------------------------------------ commands ------------------------------------------------------------------------ ")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Toggle Leaderboard | Hold Melee")
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
		Event Player.EditorOn == False;
	}

	actions
	{
		Wait(1, Abort When False);
		Event Player.LeaderboardToggle = !Event Player.LeaderboardToggle;
	}
}

rule("Split hide")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Ability 1)) == True;
		Is Button Held(Event Player, Button(Primary Fire)) == True;
		Is Button Held(Event Player, Button(Secondary Fire)) == True;
	}

	actions
	{
		Wait(1, Abort When False);
		Event Player.splitdisplay = Event Player.splitdisplay == -999 ? 0 : -999;
		Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
		Wait(0.016, Ignore Condition);
		Small Message(Event Player, Event Player.splitdisplay == -999 ? Custom String("   split display off") : Custom String(
			"   split display on"));
	}
}

rule("Toggle Invisible | Hold Deflect")
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
		Event Player.EditorOn == False;
		Global.CompMode == False;
	}

	actions
	{
		Wait(1, Abort When False);
		Event Player.invis = !Event Player.invis;
		Set Invisible(Event Player, None);
		If(Event Player.invis);
			Set Invisible(Event Player, All);
		End;
		Small Message(Event Player, Custom String("   {0} {1}", String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(
			Rose)) == Custom String("玫红") ? Custom String("隐身模式") : Custom String("Invisible"), Event Player.invis ? Custom String("on")
			: Custom String("off")));
		Play Effect(Event Player, Debuff Impact Sound, Null, Event Player, 100);
	}
}

rule("Preview orbs/portals | Hold Primary")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Primary Fire)) == True;
		Event Player.EditorOn == False;
	}

	actions
	{
		Wait(0.900, Abort When False);
		"prevent preview empty bug"
		Event Player.PreviewsArray = Empty Array;
		If(Count Of(Global.CustomPortalStart) > 0);
			Event Player.PreviewsArray = Filtered Array(Global.CustomPortalStart, Global.CustomPortalCP[Index Of Array Value(
				Global.CustomPortalStart, Current Array Element)] == Event Player.A);
		End;
		Modify Player Variable(Event Player, PreviewsArray, Append To Array, Filtered Array(Global.TQ,
			Global.pinballnumber[Index Of Array Value(Global.TQ, Current Array Element)
			] == Event Player.A && Global.BounceToggleLock[Index Of Array Value(Global.TQ, Current Array Element)] == True));
		Abort If(Count Of(Event Player.PreviewsArray) < 1 || Event Player.PreviewsArray == Null || !Event Player.NotOnLastCp);
		Wait(0.100, Ignore Condition);
		Set Move Speed(Event Player, 0);
		Event Player.PreviewsI = 0;
		Start Camera(Event Player, Event Player.PreviewsArray[Event Player.PreviewsI] + Facing Direction Of(Event Player) * -3.500,
			Event Player.PreviewsArray[Event Player.PreviewsI], 15);
		While(Is Button Held(Event Player, Button(Primary Fire)) && Is Alive(Event Player));
			If(X Component Of(Throttle Of(Event Player)) < -0.500);
				Event Player.PreviewsI = Event Player.PreviewsI + 1 >= Count Of(Event Player.PreviewsArray) ? 0 : Event Player.PreviewsI + 1;
				Wait Until(X Component Of(Throttle Of(Event Player)) > -0.500, 1);
			Else If(X Component Of(Throttle Of(Event Player)) > 0.500);
				Event Player.PreviewsI = Event Player.PreviewsI == 0 ? Count Of(Event Player.PreviewsArray) - 1 : Event Player.PreviewsI - 1;
				Wait Until(X Component Of(Throttle Of(Event Player)) < 0.500, 1);
			End;
			Wait(0.016, Ignore Condition);
		End;
		Stop Camera(Event Player);
		Set Move Speed(Event Player, 100);
		Event Player.PreviewsArray = Null;
	}
}

rule("Restart Run | Crouch + Interact + Deflect")
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
		"@Condition not eventPlayer.isUsingAbility1()"
		Event Player.LockState = True;
		"prevent 0.02 time bug with next 2 checks"
		If(Event Player.A == Count Of(Global.A) - 2 && Altitude Of(Event Player) < 3);
			Wait Until(Is On Ground(Event Player), 3);
			"0.64"
			Wait(0.420, Ignore Condition);
		End;
		If(Event Player.A == Count Of(Global.A) - 1);
			Wait(0.420, Ignore Condition);
		End;
		If(Global.CompMode);
			Wait(0.016, Ignore Condition);
			If(Global.CompTime < 1);
				Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
					? Custom String("   比赛结束") : Custom String("   The competition is over"));
				Event Player.LockState = False;
				Abort;
			Else If(Event Player.CompDone);
				Event Player.LockState = False;
				Abort;
			Else If(Global.CompRestartLimit && Event Player.NotOnLastCp);
				Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
					? Custom String("   禁止在此比赛中运行期间重新启动") : Custom String("   Restart during run is disabled for this competition"));
				Event Player.LockState = False;
				Abort;
			Else If(Global.CompAtmpNum > 0);
				If(Event Player.AttemptCount == Global.CompAtmpNum);
					Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
						? Custom String("   最后一次尝试") : Custom String("   You are on your last attempt"));
					Event Player.LockState = False;
					Abort;
				End;
				If(Event Player.AttemptCount == -1);
					Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
						? Custom String("   你没有尝试过") : Custom String("   You are out of attempts"));
					Event Player.LockState = False;
					Abort;
				End;
				Event Player.AttemptCount += 1;
				Global.CompAtmpSaveCount[Index Of Array Value(Global.CompAtmpSaveNames, Custom String("{0}", Event Player))
					] = Event Player.AttemptCount;
			End;
		End;
		Event Player.flytoggle = Null;
		Event Player.A = 0;
		Event Player.PracticeToggle = False;
		Event Player.PracticeCheckpoint = 0;
		Event Player.C = False;
		Stop Chasing Player Variable(Event Player, practicetimer);
		Event Player.practicetimer = 0;
		Event Player.splitdisplay = Event Player.splitdisplay == -999 ? -999 : 0;
		If(Array Contains(Global.SaveEnt, Event Player));
			Call Subroutine(DeleteSave);
		End;
		If(Is Dead(Event Player));
			Respawn(Event Player);
		End;
		Call Subroutine(Sub1);
		Play Effect(Event Player, Ring Explosion Sound, Color(White), Event Player, 100);
		Wait(0.016, Ignore Condition);
		Event Player.LockState = False;
		If(Global.CompMode);
			Wait(1, Ignore Condition);
		Else;
			Wait(0.016, Ignore Condition);
	}
}

rule("Enter Spectate | Hold Interact")
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
		Global.CompMode == False;
	}

	actions
	{
		Wait(1, Abort When False);
		"editor has interact combos"
		If(Event Player.EditorOn);
			Wait(1, Abort When False);
		End;
		Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("   再次长按互动键关闭观战模式") : Custom String("   Hold Interact again to turn off spectate mode"));
		If(Event Player.F);
			Respawn(Event Player);
			Teleport(Event Player, Last Of(Global.A[Event Player.A]));
			If(Event Player.NotOnLastCp);
				If(Event Player.PracticeToggle);
					Chase Player Variable At Rate(Event Player, practicetimer, 9999999.000, 1, None);
				Else;
					Chase Player Variable At Rate(Event Player, D, 9999999.000, 1, None);
				End;
			End;
			Start Rule(CheckUlt, Restart Rule);
			Start Rule(CheckDash, Restart Rule);
			Enable Built-In Game Mode Respawning(Event Player);
			Event Player.C = False;
			Event Player.LockCollected = Empty Array;
			If(Event Player.NotOnLastCp);
				Call Subroutine(StopPauseTimer);
			End;
		Else;
			If(Event Player.NotOnLastCp);
				Call Subroutine(StartPauseTimer);
			End;
			Stop Chasing Player Variable(Event Player, practicetimer);
			Stop Chasing Player Variable(Event Player, D);
			Disable Built-In Game Mode Respawning(Event Player);
			Wait(0.200, Ignore Condition);
			Kill(Event Player, Null);
			Teleport(Event Player, Last Of(Global.A[Event Player.A]));
		End;
		Event Player.F = !Event Player.F;
	}
}

rule("Toggle Invincible Mode | Melee + Reload")
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
		Is Using Ultimate(Event Player) == False;
		Is Alive(Event Player) == True;
		(!Global.CompMode || !Event Player.CompDone) == True;
		Event Player.LockState == False;
	}

	actions
	{
		Event Player.LockCollected = Empty Array;
		Event Player.flytoggle = Null;
		If(Event Player.A > 0 && !Event Player.NotOnLastCp);
			Disallow Button(Event Player, Button(Ability 1));
			If(Is Using Ability 1(Event Player));
				Wait Until(!Is Using Ability 1(Event Player), 1.500);
				Wait(0.016, Ignore Condition);
			End;
		End;
		If(Event Player.C);
			Start Forcing Player Position(Event Player, Last Of(Global.A[Event Player.A]), True);
			Teleport(Event Player, Last Of(Global.A[Event Player.A]));
			Wait(0.160, Ignore Condition);
			If(Event Player.PracticeToggle);
				Big Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
					? Custom String("练习模式") : Custom String("Practice mode"));
				Chase Player Variable At Rate(Event Player, practicetimer, 9999999.000, 1, None);
			Else;
				Big Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
					? Custom String("跑图模式") : Custom String("Normal mode"));
				Chase Player Variable At Rate(Event Player, D, 9999999.000, 1, None);
				Call Subroutine(StopPauseTimer);
			End;
			Stop Forcing Player Position(Event Player);
			Event Player.flytoggle = Null;
		Else;
			If(!Event Player.NotOnLastCp);
				Allow Button(Event Player, Button(Ability 1));
				Wait(0.016, Ignore Condition);
				Abort;
			End;
			Call Subroutine(StartPauseTimer);
			Stop Chasing Player Variable(Event Player, D);
			Stop Chasing Player Variable(Event Player, practicetimer);
			Big Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
				? Custom String("探点模式") : Custom String("Invincible mode"));
			Event Player.flytoggle = Null;
			Wait(0.200, Ignore Condition);
		End;
		Event Player.C = !Event Player.C;
		Start Rule(CheckUlt, Restart Rule);
		Start Rule(CheckDash, Restart Rule);
		"cp 0 start dash ban is via startgame sub because it has to give msg"
		If(Event Player.A > 0);
			Allow Button(Event Player, Button(Ability 1));
			Wait(0.160, Ignore Condition);
	}
}

rule("Toggle Practice Mode | Melee + Ultimate")
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
		Is Using Ability 1(Event Player) == False;
		Is Alive(Event Player) == True;
		Event Player.EditorOn == False;
		Global.CompMode == False;
	}

	actions
	{
		If(Event Player.C);
			Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
				? Custom String("   探点模式下无法切换练习模式") : Custom String("   Cannot toggle practice mode while in invincible"));
			Wait(0.016, Ignore Condition);
			Abort;
		End;
		Event Player.LockState = True;
		If(Is Using Ultimate(Event Player));
			Kill(Event Player, Null);
		End;
		Wait(0.160, Ignore Condition);
		If(Event Player.PracticeToggle);
			Start Forcing Player Position(Event Player, Last Of(Global.A[Event Player.PracticeCheckpoint]), True);
			Event Player.A = Event Player.PracticeCheckpoint;
			Call Subroutine(checkpointFailReset);
			Event Player.LockCollected = Empty Array;
			Call Subroutine(UpdateCache);
			Wait(0.100, Ignore Condition);
			Stop Chasing Player Variable(Event Player, practicetimer);
			Big Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
				? Custom String("跑图模式") : Custom String("Normal mode"));
			If(Event Player.NotOnLastCp);
				Event Player.splittime = Event Player.D;
				"abs removed"
				Chase Player Variable At Rate(Event Player, D, 9999999.000, 1, None);
				Call Subroutine(StopPauseTimer);
			End;
			Start Rule(CheckUlt, Restart Rule);
			Start Rule(CheckDash, Restart Rule);
			Stop Forcing Player Position(Event Player);
		Else;
			Event Player.PracticeCheckpoint = Event Player.A;
			Start Forcing Player Position(Event Player, Last Of(Global.A[Event Player.A]), True);
			Stop Chasing Player Variable(Event Player, D);
			Big Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
				? Custom String("练习模式") : Custom String("Practice mode"));
			Stop Forcing Player Position(Event Player);
			If(Event Player.NotOnLastCp);
				Call Subroutine(StartPauseTimer);
			End;
			Event Player.splitdisplay = Event Player.splitdisplay == -999 ? -999 : 0;
			Event Player.splittime = 0;
			Event Player.practicetimer = 0;
			Chase Player Variable At Rate(Event Player, practicetimer, 9999999.000, 1, None);
			Wait(0.200, Ignore Condition);
		End;
		Event Player.PracticeToggle = !Event Player.PracticeToggle;
		Wait(0.300, Ignore Condition);
		Event Player.LockState = False;
	}
}

rule("Practice Restart | Interact")
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
		Is Button Held(Event Player, Button(Crouch)) == False;
		Is Button Held(Event Player, Button(Ultimate)) == False;
		Is Button Held(Event Player, Button(Melee)) == False;
		Is Button Held(Event Player, Button(Ability 2)) == False;
		(Is Alive(Event Player) || Event Player.F) == True;
		Event Player.EditorOn == False;
		Event Player.PracticeToggle != False;
	}

	actions
	{
		"first 2 ifs prevent collide with spec"
		If(Event Player.F);
			Wait Until(Is Alive(Event Player), 9999);
			Wait Until(!Is Button Held(Event Player, Button(Interact)), 2);
			Abort;
		End;
		Wait Until(!Is Button Held(Event Player, Button(Interact)), 0.900);
		Abort If(Is Button Held(Event Player, Button(Interact)));
		If(Is Using Ultimate(Event Player));
			Kill(Event Player, Null);
		End;
		Event Player.practicetimer = 0;
		Event Player.splittime = 0;
		Teleport(Event Player, Global.A[Event Player.PracticeCheckpoint]);
		Event Player.A = Event Player.PracticeCheckpoint;
		Set Status(Event Player, Null, Rooted, 0.200);
		Event Player.LockCollected = Empty Array;
		Call Subroutine(UpdateCache);
	}
}

rule("Skip | Crouch + Primary/Secondary Fire")
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
		(Is Button Held(Event Player, Button(Primary Fire)) || Is Button Held(Event Player, Button(Secondary Fire))) == True;
		(Host Player.EditorOn || (Event Player.PracticeToggle && Is Button Held(Event Player, Button(Ability 1)))) == True;
		Event Player.LockState == False;
	}

	actions
	{
		"@Condition hostPlayer.EditorOn or eventPlayer.PracticeToggle"
		Event Player.splittime = 0;
		Event Player.practicetimer = 0;
		If(Is Button Held(Event Player, Button(Secondary Fire)));
			Event Player.LockState = True;
			If(Event Player.A < 1);
				Event Player.A = Count Of(Global.A) - 1;
			Else If(Count Of(Global.A[Event Player.A - 1]) > 1 && Distance Between(First Of(Global.A[Event Player.A]),
					Global.A[Event Player.A - 1][1]) < 1.400);
				Event Player.A -= 2;
			Else;
				Event Player.A -= 1;
			End;
		Else;
			Event Player.LockState = True;
			If(Event Player.A >= Count Of(Global.A) - 1);
				Event Player.A = 0;
			Else;
				Event Player.A += 1;
			End;
		End;
		Wait(0.016, Ignore Condition);
		Call Subroutine(checkpointFailReset);
		Wait(0.064, Ignore Condition);
		Event Player.LockState = False;
		Event Player.MovedCheckpoint = True;
		Call Subroutine(UpdateCache);
		"faster if you spam button"
		Wait Until(!Is Button Held(Event Player, Button(Primary Fire)) && !Is Button Held(Event Player, Button(Secondary Fire)), 0.280);
		Loop If Condition Is True;
	}
}

rule("Quick Reset | Reload, Hold Reload to Enable")
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
		Is Button Held(Event Player, Button(Melee)) == False;
	}

	actions
	{
		If(Event Player.quick_restart);
			If(Event Player.EditorOn);
				If(Event Player == Host Player && Event Player.E == 0 && Is Button Held(Event Player, Button(Interact)));
					"wait(0.1, Wait.ABORT_WHEN_FALSE)"
					Wait(0.200, Ignore Condition);
				End;
			End;
			Event Player.splittime = Event Player.PracticeToggle ? Event Player.practicetimer : Event Player.D;
			Event Player.LockCollected = Empty Array;
			If(Is Using Ultimate(Event Player));
				Kill(Event Player, Null);
			End;
			Start Forcing Player Position(Event Player, Last Of(Global.A[Event Player.A]), True);
			Event Player.flytoggle = Null;
			Start Rule(CheckUlt, Restart Rule);
			Start Rule(CheckDash, Restart Rule);
			Teleport(Event Player, Last Of(Global.A[Event Player.A]));
			Wait(0.100, Ignore Condition);
			Stop Forcing Player Position(Event Player);
			If(Event Player.A == 0 && !Event Player.PracticeToggle);
				Event Player.D = 0;
				Event Player.splittime = 0;
			End;
			Event Player.flytoggle = Null;
			Wait(0.240, Ignore Condition);
		End;
		Wait(1, Abort When False);
		Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
		Event Player.quick_restart = !Event Player.quick_restart;
		Big Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? (
			Event Player.quick_restart ? Custom String("快速回点已启用") : Custom String("快速回点已关闭")) : (
			Event Player.quick_restart ? Custom String("Quick reset is enabled") : Custom String("Quick reset is disabled")));
	}
}

rule("Toggle Hud | hold secondary")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Button Held(Event Player, Button(Secondary Fire)) == True;
		"don't trigger during skiping"
		(Is Button Held(Event Player, Button(Crouch)) && Is Button Held(Event Player, Button(Ability 1))) == False;
		First Of(Event Player) != False;
	}

	actions
	{
		Wait(1.500, Abort When False);
		Play Effect(Event Player, Buff Impact Sound, Color(White), Event Player, 100);
		Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? (Event Player.K ? Custom String("   HUD已开启") : Custom String("HUD已隐藏")) : (Event Player.K ? Custom String(
			"   Hud is now open") : Custom String("   Hud is now hidden")));
		Event Player.K = !Event Player.K;
	}
}

disabled rule("------------------------------------------------------------------------ Checks ------------------------------------------------------------------------ ")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Checking | ult combined rule")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Using Ultimate(Event Player) == True;
	}

	actions
	{
		Wait(1.800, Abort When False);
		If(Event Player.NotOnLastCp && !Event Player.C);
			"disable primary fire because of slash exploit"
			Disallow Button(Event Player, Button(Primary Fire));
		End;
		Wait Until(!Is Using Ultimate(Event Player), 2);
		Wait(0.016, Ignore Condition);
		Allow Button(Event Player, Button(Primary Fire));
		"sets ult charge back if done with map etc"
		Start Rule(CheckUlt, Restart Rule);
	}
}

rule("Checking | Dash combined rule")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Using Ability 1(Event Player) == True;
	}

	actions
	{
		Start Rule(CheckDash, Restart Rule);
	}
}

rule("Subroutine CheckUlt")
{
	event
	{
		Subroutine;
		CheckUlt;
	}

	actions
	{
		If(Event Player.LockState);
			"for dash start etc you can be away from cp so the keep charge triggers"
			Set Ultimate Charge(Event Player, 0);
		End;
		Wait Until(!Is Using Ultimate(Event Player), 2);
		If(Event Player.C || !Event Player.NotOnLastCp);
			"skip msg if these"
			Skip(2);
		Else If(Array Contains(Global.Dao, Event Player.A) && Distance Between(Event Player, Last Of(Global.A[Event Player.A])) <= 1.400);
			Small Message(Event Player, Custom String("   {0} {1} ", Ability Icon String(Hero(Genji), Button(Ultimate)), String("Capture")
				== Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("终极技能已就绪") : Custom String(
				"Ultimate is ready")));
			Wait(0.016, Ignore Condition);
			Set Ultimate Ability Enabled(Event Player, True);
			Set Ultimate Charge(Event Player, 100);
		Else If(Event Player.EditorOn);
			Wait(0.016, Ignore Condition);
			Set Ultimate Ability Enabled(Event Player, True);
			Set Ultimate Charge(Event Player, 100);
		"used to be just else, but have to deal with multi ult orbs"
		Else If(Distance Between(Event Player, Last Of(Global.A[Event Player.A])) <= 2 || Ultimate Charge Percent(Event Player) < 100);
			Set Ultimate Ability Enabled(Event Player, False);
			Set Ultimate Charge(Event Player, 0);
		End;
	}
}

rule("Subroutine CheckDash")
{
	event
	{
		Subroutine;
		CheckDash;
	}

	actions
	{
		Wait Until(!Is Using Ability 1(Event Player), 2);
		If(Event Player.C || !Event Player.NotOnLastCp);
			"skip msg if these"
			Skip(2);
		Else If(Array Contains(Global.SHIFT, Event Player.A) && Distance Between(Event Player, Last Of(Global.A[Event Player.A]))
				<= 1.400);
			Small Message(Event Player, Custom String("   {0} {1}", Ability Icon String(Hero(Genji), Button(Ability 1)), String("Capture")
				== Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红") ? Custom String("技能1影已就绪") : Custom String(
				"Dash is ready")));
			Wait(0.016, Ignore Condition);
			Set Ability 1 Enabled(Event Player, True);
		"seeprate so msg stil plays"
		Else If(Event Player.EditorOn);
			Set Ability 1 Enabled(Event Player, True);
		Else;
			Set Ability 1 Enabled(Event Player, False);
		End;
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
		"?????? why wasnt this as fales"
		Is Button Held(Event Player, Button(Jump)) == False;
	}

	actions
	{
		Event Player.O = False;
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
		"actualy just checks if you been in the air for atleast 0.1 seconds"
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
		Event Player.J = True;
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
		Event Player.O = False;
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
		Event Player.O == False;
		Is Jumping(Event Player) == True;
	}

	actions
	{
		Event Player.O = True;
		Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("   小跳已用") : Custom String("   Bhop"));
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
		Is Button Held(Event Player, Button(Crouch)) == True;
		Is Crouching(Event Player) == True;
		Is In Air(Event Player) == True;
		Is On Wall(Event Player) == False;
		Is Button Held(Event Player, Button(Jump)) == False;
		Is Jumping(Event Player) == False;
		Is On Ground(Event Player) == False;
	}

	actions
	{
		Event Player.O = False;
		If(Event Player.ban_create && Event Player.C == False && Event Player.A < Count Of(Global.A) - 1);
			Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
				? Custom String("   卡小 ♂ 已禁用!") : Custom String("   Create Bhop ♂ is banned!"));
			Call Subroutine(checkpointFailReset);
			Abort;
		End;
		Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("   succes!") : Custom String("   Bhop has been created!"));
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
		Event Player.TY = 0;
		Event Player.J = False;
		Event Player.climbNum = 0;
		Wait(0, Ignore Condition);
		Loop If((Event Player.TY != 0 || Event Player.J) && Is On Ground(Event Player));
		Event Player.O = True;
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
		Event Player.J == False;
	}

	actions
	{
		Event Player.climbNum += 1;
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

rule("Ban | Wallclimb - indicator ")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Event Player.ban_climb != False;
		Event Player.C == False;
		Event Player.NotOnLastCp != False;
		Event Player.J != False;
	}

	actions
	{
		"checkpointFailReset()\r\neventPlayer.setStatusEffect(null,Status.BURNING, 0.1)"
		Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("   爬墙 ↑ 已禁用!") : Custom String("   Climb ↑ is banned!"));
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
		Event Player.ban_triple != False;
		Event Player.C == False;
		Event Player.NotOnLastCp != False;
		Vertical Speed Of(Event Player) >= 5.800;
		Event Player.TY == 1;
		Is Using Ability 1(Event Player) == False;
		Is On Wall(Event Player) == False;
	}

	actions
	{
		Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("   三段跳 ▲ 已禁用!") : Custom String("   Triple Jump ▲ is banned!"));
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
		Event Player.ban_multi != False;
		Event Player.C == False;
		Event Player.NotOnLastCp != False;
		Event Player.climbNum > 0;
	}

	actions
	{
		Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("    蹭留 ∞ 已禁用!") : Custom String("   Multiclimb ∞ is banned!"));
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
		Event Player.ban_emote != False;
		Event Player.C == False;
		Event Player.NotOnLastCp != False;
		Is Communicating Any Emote(Event Player) == True;
	}

	actions
	{
		Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
			? Custom String("   表情爬 ♥ 已禁用!") : Custom String("   Emote Savehop ♥ is banned!"));
		Call Subroutine(checkpointFailReset);
	}
}

disabled rule("------------------------------------------------------------------------ Addon functions  ------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Pre-set control map portal | function | toggled via workshop")
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
		(Event Player.C || !Event Player.NotOnLastCp) == True;
		Count Of(Global.PortalLoc) != Null;
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

rule("Custom portals | function")
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
			< 1.300 && Array Contains(Array(999, Event Player.A), Global.CustomPortalCP[Current Array Index])) == True;
	}

	actions
	{
		Event Player.PortalLoop = 0;
		For Player Variable(Event Player, PortalLoop, 0, Count Of(Global.CustomPortalStart), 1);
			If(Distance Between(Position Of(Event Player) + Vector(0, 0.200, 0), Global.CustomPortalStart[Event Player.PortalLoop])
				< 1.300 && Array Contains(Array(999, Event Player.A), Global.CustomPortalCP[Event Player.PortalLoop]));
				Teleport(Event Player, Global.CustomPortalEndpoint[Event Player.PortalLoop]);
				Abort;
			End;
		End;
		Wait(1, Ignore Condition);
	}
}

rule("Pre-set control map portal | toggled on via workshop settings")
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
		Else If(Current Map == Map(Lijiang Tower) || Current Map == Map(Lijiang Tower));
			"\"control > garden\",\"control > market\",\"garden > control\",\"garden > market\",\"market > control\",\"market > garden\""
			Global.PortalNames = Array(Custom String("Garden"), Custom String("Night Market"), Custom String("Control Center"), Custom String(
				"Night Market"), Custom String("Control Center"), Custom String("Garden"));
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
			"\"uni > garden\",\"uni > city\",\"garden > uni\",\"garden > city\",\"city > garden\",\"city > uni\""
			Global.PortalNames = Array(Custom String("Gardens"), Custom String("City Center"), Custom String("University"), Custom String(
				"City Center"), Custom String("Gardens"), Custom String("University"));
			Global.PortalLoc = Array(Vector(-211.137, 20, -5.084), Vector(-211.346, 20, 5.029), Vector(143.061, 8.377, -245.040), Vector(
				139.333, 8.377, -249.964), Vector(157.297, 12.522, 255.759), Vector(151.452, 12.522, 261.099));
			Global.PortalDest = Array(Vector(134.366, 7.829, -240.530), Vector(158.270, 11.814, 262.272), Vector(-206.269, 19.292, 0.103),
				Vector(158.283, 11.814, 262.283), Vector(134.318, 7.829, -240.667), Vector(-206.269, 19.292, 0.103));
		Else If(Current Map == Map(Antarctic Peninsula));
			Global.PortalNames = Array(Custom String("labs"), Custom String("icebreaker"), Custom String("Sublevel"), Custom String(
				"icebreaker"), Custom String("labs"), Custom String("Sublevel"));
			Global.PortalLoc = Array(Vector(280.660, -12.150, -223.650), Vector(273.270, 42.740, 198.150), Vector(266.580, 42.740, 198.170),
				Vector(-58.290, -154, 63.030), Vector(-58.360, -154, 56.470), Vector(287.080, -12.150, -223.590));
			Global.PortalDest = Array(Vector(270, 42.700, 190.440), Vector(284.070, -12.750, -216.150), Vector(-53.510, -154.500, 60.080),
				Vector(284.070, -12.750, -216.150), Vector(270, 42.700, 190.440), Vector(-53.510, -154.500, 60.080));
		Else;
			Global.PortalDest = Null;
			Global.PortalLoc = Null;
			Global.PortalNames = Null;
			Abort;
	}
}

rule("Ms. Destructo | Destroys Breakable Objects On All Maps")
{
	event
	{
		Ongoing - Global;
	}

	conditions
	{
		"Credit: nebula#11571"
		Is Game In Progress == True;
	}

	actions
	{
		"Multiple bots"
		Global.MsDestructo = Empty Array;
		Wait Until(Is True For Any(All Players(All Teams), Has Spawned(Current Array Element)), 99999);
		If(True);
			Skip(Array(14, 0, 2, 4, 6, 8, 10, 12)[1 + Index Of Array Value(Array(Map(Ilios), Map(Busan), Map(Lijiang Tower), Map(Nepal), Map(
				Oasis), Map(New Queen Street), Map(Antarctic Peninsula)), Current Map)]);
			Global.MapVectorArray = Array(Vector(322.988, 40, -37.732), Vector(27.711, 100, -161.298), Vector(-223.895, 50, 0.890));
		Else;
			Global.MapVectorArray = Array(Vector(51.885, 37.172, -113.654), Vector(-329.934, 56.136, 149.839), Vector(227.210, 43.353,
				252.640));
		Else;
			Global.MapVectorArray = Array(Vector(-5.808, 324.398, 282.523), Vector(-0.414, 156.197, 148.681), Vector(-0.381, 53.736, -33.335));
		Else;
			Global.MapVectorArray = Array(Vector(83.100, 178.926, 0.593), Vector(-49.803, 63.290, -0.413), Vector(-184.659, -38.730, -0.783));
		Else;
			Global.MapVectorArray = Array(Vector(150.125, 30.619, 251.966), Vector(134.888, 36.760, -240.736), Vector(-195.549, 60.350,
				-0.098));
		Else;
			Global.MapVectorArray = Array(Vector(-13.790, 1.960, 15.920), Vector(0, 35, 25), Vector(0, 8, 23.770), Vector(13.280, 2, 15));
		Else;
			Global.MapVectorArray = Array(Vector(-86, -110, 59), Vector(277, 132, 170), Vector(283, 57, -235));
		Else;
			"lunar new year catch"
			If(String Contains(Custom String("{0}", Current Map), Custom String("{0}", Map(Lijiang Tower))));
				Global.MapVectorArray = Array(Vector(-5.808, 324.398, 282.523), Vector(-0.414, 156.197, 148.681), Vector(-0.381, 53.736, -33.335));
			"lunar new year catch"
			Else If(String Contains(Custom String("{0}", Current Map), Custom String("{0}", Map(Busan))));
				Global.MapVectorArray = Array(Vector(51.885, 37.172, -113.654), Vector(-329.934, 56.136, 149.839), Vector(227.210, 43.353,
					252.640));
			"This default covers almost every map"
			Else;
				Global.MapVectorArray = Array(Vector(73, 62, -17), Vector(169, 62, 82), Vector(-23, 62, -124), Vector(-23, 62, 100));
			End;
		Else;
		End;
		For Global Variable(DestructoIter, 0, Count Of(Global.MapVectorArray), 1);
			Create Dummy Bot(Hero(D.Va), Team Of(First Of(Filtered Array(All Players(All Teams), Has Spawned(Current Array Element)
				&& !Is Dummy Bot(Current Array Element)))), 20 - Evaluate Once(Global.DestructoIter), Evaluate Once(
				Global.MapVectorArray[Evaluate Once(Global.DestructoIter)]), Vector(0, 0, 0));
			Global.MsDestructo[Evaluate Once(Global.DestructoIter)] = Last Created Entity;
			Start Scaling Player(Global.MsDestructo[Evaluate Once(Global.DestructoIter)], 20, True);
			Wait(0.016, Ignore Condition);
			Set Gravity(Global.MsDestructo[Evaluate Once(Global.DestructoIter)], 0);
			Apply Impulse(Global.MsDestructo[Evaluate Once(Global.DestructoIter)], Up, 1, To Player, Cancel Contrary Motion XYZ);
			Teleport(Global.MsDestructo[Evaluate Once(Global.DestructoIter)], Evaluate Once(Global.MapVectorArray[Evaluate Once(
				Global.DestructoIter)]));
			Wait(1, Ignore Condition);
			Disable Movement Collision With Environment(Global.MsDestructo[Evaluate Once(Global.DestructoIter)], True);
			Wait(0.016, Ignore Condition);
			Set Ultimate Ability Enabled(Global.MsDestructo[Evaluate Once(Global.DestructoIter)], True);
			Wait(0.016, Ignore Condition);
			Set Ultimate Charge(Global.MsDestructo[Evaluate Once(Global.DestructoIter)], 100);
			Wait(0.016, Ignore Condition);
		End;
		Wait(1, Ignore Condition);
		For Global Variable(DestructoIter, 0, Count Of(Global.MapVectorArray), 1);
			Start Holding Button(Global.MsDestructo[Evaluate Once(Global.DestructoIter)], Button(Ultimate));
		End;
		Wait(5, Ignore Condition);
		For Global Variable(DestructoIter, 0, Count Of(Global.MapVectorArray), 1);
			Destroy Dummy Bot(Team Of(Global.MsDestructo[Evaluate Once(Global.DestructoIter)]), Slot Of(Global.MsDestructo[Evaluate Once(
				Global.DestructoIter)]));
		End;
		"Remove MsDestructo data when done"
		Global.MapVectorArray = Null;
		Global.DestructoIter = Null;
		Global.MsDestructo = Null;
	}
}

disabled rule("------------------------------------------------------------------------  filler rules ------------------------------------------------------------------------ ")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map data and addon settings are on page 2 - 地图数据和附加组件的设置在第2页")
{
	event
	{
		Ongoing - Global;
	}
}

disabled rule("------------------------------------------------------------------------ MAP DATA - 地图数据 ------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

rule("Map Data - 数据录入 <---- INSERT HERE / 在这输入")
{
	event
	{
		Ongoing - Global;
	}
	actions
	{
		"credits"
		${mapcredits}
		"ult and dash"
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

rule("Credits here - 作者名字 <---- INSERT HERE / 在这输入 ")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"Filling this in adds it to the inspector pasta after next restart.\r\n You can fill in again to overwrite.\r\n 填充此字段 将其添加到 检查器数据 面中\r\n 您可以再次 填写以覆盖 之前的条目"
		Global.Name = Custom String("name here - 作者");
		Global.Code = Custom String("code here - 代码");
	}
}

rule("Ban per CP - 封禁(每级) <---- INSERT HERE / 在这输入")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
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

${customdifenabled}rule("Custom difficulty hud  - 自定义难度hud <---- INSERT HERE / 在这输入")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Wait(2.500, Ignore Condition);
		"1) workshop settings > difficulty > set to \"dont display\"\r\n2) enable this rule\r\n3) type your difficulty in the hud below"
		Log To Inspector(Custom String("--------"));
		"1) 设置正常 难度hud为“不显示”\r\n2) 启用此规则\r\n3) 在下面的hud中输入难度"
		Create HUD Text(All Players(All Teams), Global.Difficultyhud[1] ? (String("Capture") == Custom String("捕捉") || Custom String("{0}",
			Color(Rose)) == Custom String("玫红") ? Custom String("游戏测试") : Custom String("Playtest")) : Custom String(""), Custom String(
			"${customdiftxt}"), Null, Top, -174, Color(Blue), Color(${customdifcolor}), Color(Blue), Visible To and String,
			Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
	}
}

rule("Comp Mode instruction message - 竞赛模式指引消息 <---- INSERT HERE / 在这输入")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"Instructions that show when you start comp mode.\r\n Due to the hud text limit, you there is 4 huds available.\r\n If you dont need a field just empty the textfield."
		Log To Inspector(Custom String("--------"));
		"竞赛模式 指引消息\r\n 指引消息将 会在竞赛模 式开始时 显示\r\n 由于 hud 文本限制，你有 4 个hud可用\r\n 如果你不需 要一个字段 只是空文 本字段"
		Global.instructiontext[0] = Custom String("${compdescription[0]}");
		Global.instructiontext[1] = Custom String("${compdescription[1]}");
		Global.instructiontext[2] = Custom String("${compdescription[2]}");
		Global.instructiontext[3] = Custom String("${compdescription[3]}");
	}
}

disabled rule("------------------------------------------------------------------------ Addons Settings and data - 附加组件 ------------------------------------------------------------------------")
{
	event
	{
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

disabled rule("Friend Title - 朋友称号 <---- DISPLAY MESSAGE HERE (ON PLAYER)")
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
		"\"your nickname\" your friends ingame name\r\n \"display title\" fill in the custom title\r\n \"your nickname\" 填入球员 的名字 \r\n \"display title\" 习俗标题"
		If(Custom String("your nickname <-------") == Custom String("{0}", Event Player));
			Big Message(All Players(All Teams), Custom String("Message to the whole room"));
			Create In-World Text(All Players(All Teams), Custom String("display title"), Event Player, 1.500, Clip Against Surfaces,
				Visible To Position and String, Color(Orange), Default Visibility);
		End;
		If(Custom String("your nickname <-------") == Custom String("{0}", Event Player));
			Big Message(All Players(All Teams), Custom String("Message to the whole room"));
			Create In-World Text(All Players(All Teams), Custom String("display title"), Event Player, 1.500, Clip Against Surfaces,
				Visible To Position and String, Color(Orange), Default Visibility);
		End;
		If(Custom String("your nickname <-------") == Custom String("{0}", Event Player));
			Big Message(All Players(All Teams), Custom String("Message to the whole room"));
			Create In-World Text(All Players(All Teams), Custom String("display title"), Event Player, 1.500, Clip Against Surfaces,
				Visible To Position and String, Color(Orange), Default Visibility);
	}
}

disabled rule("Display World Record - 展示世界纪录 <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"type your entry in the textfield that says \"name and time here\"\r\n 在文本框 中输入“名称和时间”"
		Create HUD Text(All Players(All Teams), Null, Custom String(" \n{0} world record {0}", Icon String(Fire)), Custom String(
			"name and time here"), Right, -147, Color(Rose), Color(Rose), Color(Rose), Visible To, Default Visibility);
		Modify Global Variable(HudStoreEdit, Append To Array, Last Text ID);
	}
}

${hudeanbled}rule("HUD text for certain Checkpoints - 某些检查点的HUD文本 <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"the example fill shows a text for cp 1 and cp 3\r\n 示例填充 显示了cp 1和cp 3的文本"
		Wait(1, Ignore Condition);
		"in CpHudText fill in text\r\n 在 “CpHudText” 中填写文本"
		${hudtext}
		"in CpHudCp fill in the at wich to display\r\n 在 “CpHudCp” 中填写要显 示的位置"
		${hudcps}
	}
}

${iwtenabled}rule("Inworld text for certain Checkpoints - 在世界文本中为某些检查点 <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
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

disabled rule("Custom portals data - 自定义传送门数据  <---- EDIT ME / 在此处编辑")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"warning: This can cause you to exceed global orb/portal limit. \r\nmake sure portal + orbs do not go past the limit.\r\n请先确保传 送门+球体 总数不会超 过可添加数 量上限."
		Wait(1, Ignore Condition);
		"Portal start position\r\n传送门起点 位置"
		Global.CustomPortalStart = Array(Vector(0, 0, 0));
		"Portal end position (on same number as start position)\r\n  传送门终点 位置 (顺序与传 送门起点位 置保持一致)"
		Global.CustomPortalEndpoint = Array(Vector(0, 10, 0));
		"Portal checkpoint (on same number as start position) \r\n999 = apply portal to entire map\r\n启用传送门 检查点 (顺序与传 送门起点位 置保持一致) \r\n999 = 传送门在全 部检查点启用"
		Global.CustomPortalCP = Array(999);
	}
}

disabled rule("------------------------------------------------------------------------ Addons skills - 附加组件技能 ------------------------------------------------------------------------")
{
	event
	{
		Ongoing - Global;
	}
}

disabled rule("Dash/Blade | DEPRICATED, instructions inside - 刀/Shift | 已弃用, 内含指引")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		"-\r\n >>> this rule should no longer be used <<<\r\n >>> 这条规则本版本已弃用 <<<\r\n -"
		Log To Inspector(Custom String("----------------"));
		"you can add ult/dash via checkpoint mode in the ingame editor\r\n existing map data should be updated to include this in map data\r\n Paste the blade and ult variable from the dash/ult rules old into the map pasta rule."
		Log To Inspector(Custom String("----------------"));
		"可通过游戏 内编辑器在 检查点模式 下添加刀 / Shift\r\n 过去的地图 数据需 要更新，以便在 地图 数据包含刀 / Shift 数据"
		Log To Inspector(Custom String("----------------"));
	}
}

${faketripleon}rule("Fake Triple Jump - enable rule - 启用此规则 - 假三级跳")
{
	event
	{
		Ongoing - Each Player;
		All;
		Genji;
	}

	conditions
	{
		"check starts in air when not double jumping, this is to detect double jumping"
		Is On Ground(Event Player) == False;
		"false when double jumping"
		Is Jumping(Event Player) == True;
		"prevent rest of code from runing if you are not gona be close to ground"
		Altitude Of(Event Player) < 0.500;
		"avoid trigering on start of jump, only when u go downwards"
		Vertical Speed Of(Event Player) < 0;
		"don't triger on reset"
		Is Button Held(Event Player, Button(Reload)) == False;
		Is Using Ability 1(Event Player) == False;
		Is On Wall(Event Player) == False;
	}

	actions
	{
		"if you double jump or climb etc before touching ground, reset"
		Wait Until(Is On Ground(Event Player) || !Is Jumping(Event Player) || Is On Wall(Event Player) || Is Using Ability 1(Event Player)
			|| Is Button Held(Event Player, Button(Reload)), 999);
		Abort If((!Is On Ground(Event Player) && !Is Jumping(Event Player)) || Is On Wall(Event Player) || Is Using Ability 1(Event Player)
			|| Is Button Held(Event Player, Button(Reload)));
		"window on the ground were you can press jump"
		Wait Until((Is Jumping(Event Player) && Is Button Held(Event Player, Button(Jump))) || Is On Wall(Event Player)
			|| Is Using Ability 1(Event Player) || Is Button Held(Event Player, Button(Reload)), 0.048);
		Abort If(Is On Wall(Event Player) || Is Using Ability 1(Event Player) || Is Button Held(Event Player, Button(Reload))
			|| Has Status(Event Player, Rooted));
		If(Is Button Held(Event Player, Button(Jump)) && Is Jumping(Event Player));
			"handle bans and invincible"
			If(Event Player.ban_triple && Event Player.C == False && Event Player.NotOnLastCp);
				Small Message(Event Player, String("Capture") == Custom String("捕捉") || Custom String("{0}", Color(Rose)) == Custom String("玫红")
					? Custom String("  三段跳 ▲ 已禁用!") : Custom String("   Triple Jump ▲ is banned!"));
				Abort;
			End;
			Apply Impulse(Event Player, Up, 9, To Player, Cancel Contrary Motion);
	}
}

disabled rule("stall enhancer - 增强系統跳的判定 - 启用此规则")
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
		Vertical Speed Of(Event Player) >= -0.200;
		Vertical Speed Of(Event Player) <= 0.050;
		Horizontal Speed Of(Event Player) <= 1.300;
		Is In Air(Event Player) == True;
		Is On Wall(Event Player) == False;
		Is On Ground(Event Player) == False;
		(Event Player.EditorOn && Event Player.flytoggle != Null) == False;
	}

	actions
	{
		"@Condition createWorkshopSetting(bool, \"map settings \\n地图设置\",\" Autobounce enhancer - 增强系統跳的判定\",false,3)"
		Wait(0.250, Abort When False);
		Start Forcing Player Position(Event Player, Position Of(Event Player), False);
		Wait Until(!Is Moving(Event Player), 1);
		Stop Forcing Player Position(Event Player);
		Set Move Speed(Event Player, 0);
		Set Gravity(Event Player, 0);
		Wait Until(Is Button Held(Event Player, Button(Reload)) || Event Player.flytoggle != Null || Is Dead(Event Player)
			|| Is Using Ability 1(Event Player) || Speed Of(Event Player) > 3, 3);
		"wait(3)"
		Set Gravity(Event Player, 100);
		Set Move Speed(Event Player, 100);
		If(Event Player.flytoggle == Null && Is Alive(Event Player) && !Is Button Held(Event Player, Button(Reload)));
			Apply Impulse(Event Player, Up, 10, To World, Cancel Contrary Motion);
			Loop If Condition Is True;
	}
}

disabled rule("Fake Ledge Dash - enable rule - 超级跳 - 启用此规则")
{
	event
	{
		Ongoing - Each Player;
		All;
		All;
	}

	conditions
	{
		Is Using Ability 1(Event Player) == True;
	}

	actions
	{
		"climb / ledge > hold jump > hands on the ledge > dash  > wait for launch > release jump\r\n爬墙/扒 > 长按跳 > 抓住窗台 > SHIFT > 等待发射 > 释放跳跃"
		Event Player.LedgeDash[0] = 0;
		Wait Until(Speed Of(Event Player) >= 45, 0.400);
		While(Is Using Ability 1(Event Player) && First Of(Event Player.LedgeDash) <= 12);
			Event Player.LedgeDash[1] = Facing Direction Of(Event Player);
			Event Player.LedgeDash[2] = Speed Of(Event Player);
			"dashed into air or object = end"
			If(Speed Of(Event Player) < 45);
				Skip(11);
			Else;
				Event Player.LedgeDash[0] += 1;
			End;
			"stop storing, we keep this speed/direction"
			If(First Of(Event Player.LedgeDash) == 12);
				"wait for dash to finish to execute"
				Wait Until(Speed Of(Event Player) < 40, 0.400);
			End;
			Wait(0.016, Ignore Condition);
		End;
		"and eventPlayer.LedgeDash[0] <= 12: # ledge dash execute"
		If(First Of(Event Player.LedgeDash) >= 5);
			Apply Impulse(Event Player, Event Player.LedgeDash[1], Event Player.LedgeDash[2], To World, Cancel Contrary Motion);
		End;
		Event Player.LedgeDash[0] = Null;
		Event Player.LedgeDash[1] = Null;
		Event Player.LedgeDash[2] = Null;
	}
}
`
}


