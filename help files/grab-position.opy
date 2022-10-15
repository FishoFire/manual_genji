
settings {
    "main": {
        "description": "manually collect data for manual template",
        "modeName": "genji tool"
    },
    "lobby": {
        "allowPlayersInQueue": true,
        "enableMatchVoiceChat": true,
        "spectatorSlots": 3,
        "team1Slots": 11,
        "team2Slots": 0,
        "returnToLobby": "never",
        "swapTeamsAfterMatch": false
    },
    "gamemodes": {
        "skirmish": {},
        "tdm": {
            "gameLengthInMn": 15,
            "enableMercyRezKillCancel": false,
            "enableSelfInitiatedRespawn": false
        },
        "general": {
            "enableHeroSwitching": false,
            "enableEnemyHealthBars": false,
            "gamemodeStartTrigger": "immediately",
            "heroLimit": "off",
            "enableKillCam": false,
            "enableKillFeed": false,
            "enableRandomHeroes": true,
            "respawnTime%": 0,
            "spawnHealthPacks": "disabled"
        }
    },
    "heroes": {
        "allTeams": {
            "genji": {
                "enableAbility2": false,
                "enableInfiniteAmmo": true,
                "enableSpawningWithUlt": true,
                "ability1Cooldown%": 0,
                "ultDuration%": 25,
                "passiveUltGen%": 500,
                "ultGen%": 500
            },
            "enabledHeroes": [
                "genji"
            ]
        }
    }
}

globalvar ring1
globalvar ring2
globalvar orb

rule "pause time":
	wait(10) 
	pauseMatchTime()

rule "ring 1":
    @Event eachPlayer
    @Condition eventPlayer.isHoldingButton(Button.INTERACT)
 	@Condition eventPlayer.isHoldingButton(Button.PRIMARY_FIRE)
    ring1 = eventPlayer.getPosition()

rule "ring 2":
    @Event eachPlayer
    @Condition eventPlayer.isHoldingButton(Button.INTERACT)
 	@Condition eventPlayer.isHoldingButton(Button.SECONDARY_FIRE)
    ring2 = eventPlayer.getPosition()


rule "orb":
    @Event eachPlayer	
	@Condition eventPlayer.isHoldingButton(Button.MELEE)
	orb = eventPlayer.getPosition()


rule "display":
    @Event eachPlayer
	eventPlayer.setStatusEffect(null, Status.PHASED_OUT, 9999)
	/*
	hudText(eventPlayer, "orb: {0}".format(orb), null, "set with Melee", HudPosition.LEFT, 0, Color.LIME_GREEN, Color.LIME_GREEN, Color.LIME_GREEN, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
	hudText(eventPlayer, "ring 1: {0}".format(ring1), null, "set with interact + primary", HudPosition.LEFT, 1, Color.SKY_BLUE, Color.SKY_BLUE, Color.SKY_BLUE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
	hudText(eventPlayer, "ring 2: {0}".format(ring2), null, "set with interact + secondary", HudPosition.LEFT, 2, Color.PURPLE, Color.PURPLE, Color.PURPLE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
	hudText(eventPlayer, "hostplayer pos: {0}".format(hostPlayer.getPosition()), null, null, HudPosition.LEFT, 3, Color.ORANGE, Color.ORANGE, Color.ORANGE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
	*/
		
	hudHeader(eventPlayer, "orb: {0}".format(orb), HudPosition.LEFT, 0, Color.LIME_GREEN, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
	hudSubheader(eventPlayer, "set with Melee\n", HudPosition.LEFT, 1, Color.LIME_GREEN, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)

	hudHeader(eventPlayer, "ring 1: {0}".format(ring1), HudPosition.LEFT, 10, Color.SKY_BLUE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
	hudSubheader(eventPlayer, "set with interact + primary\n", HudPosition.LEFT, 11, Color.SKY_BLUE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)

	hudHeader(eventPlayer, "ring 2: {0}".format(ring2), HudPosition.LEFT, 20, Color.PURPLE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
	hudSubheader(eventPlayer, "set with interact + secondary\n", HudPosition.LEFT, 21, Color.PURPLE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)

	hudHeader(eventPlayer, "hostplayer: {0}".format(hostPlayer.getPosition()), HudPosition.LEFT, 30, Color.ORANGE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)

	createEffect(getAllPlayers(), Effect.RING, Color.SKY_BLUE, ring1, 1, EffectReeval.POSITION_AND_RADIUS)
	createEffect(getAllPlayers(), Effect.RING, Color.PURPLE, ring2, 1, EffectReeval.POSITION_AND_RADIUS)
	createEffect(getAllPlayers(), Effect.ORB, Color.LIME_GREEN, orb, 1, EffectReeval.POSITION_AND_RADIUS)

