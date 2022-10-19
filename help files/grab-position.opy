
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
playervar Flymode
playervar flytoggle

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
	eventPlayer.disableGamemodeHud()
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


    hudHeader(eventPlayer, "Fly toggle: deflect", HudPosition.RIGHT, 30, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
    hudSubheader(eventPlayer, "jump/crouch to fly faster\n", HudPosition.RIGHT, 31, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)

    hudHeader(eventPlayer, "Reload: reset ring 1, +interact ring 2", HudPosition.RIGHT, 40, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)


rule "give ult":
    @Event eachPlayer
    @Condition eventPlayer.getUltCharge() < 0
    @Condition eventPlayer.isUsingUltimate() == false
    wait(0.1)
    eventPlayer.setUltCharge(100)
    if RULE_CONDITION:
        goto RULE_START


rule "Fly/Noclip Toggle | Hold Deflect":
    @Event eachPlayer
    @Condition eventPlayer.isHoldingButton(Button.ABILITY_2) == true

    waitUntil(not eventPlayer.isHoldingButton(Button.ABILITY_2), 1)
    if eventPlayer.isHoldingButton(Button.CROUCH) and eventPlayer.isHoldingButton(Button.INTERACT):
        wait()
        return

    eventPlayer.flytoggle = eventPlayer.getPosition() + Vector.UP
    eventPlayer.startForcingPosition(eventPlayer.flytoggle, true)
    eventPlayer.disableEnvironmentCollision(true)
    
    while eventPlayer.isAlive() and eventPlayer.flytoggle != null and not eventPlayer.isHoldingButton(Button.ABILITY_2):
        eventPlayer.flytoggle += eventPlayer.getFacingDirection() * (
            0.25 + eventPlayer.isHoldingButton(Button.JUMP) if eventPlayer.getThrottle().z > 0 else 
            -0.25 - eventPlayer.isHoldingButton(Button.JUMP) if eventPlayer.getThrottle().z < 0 else 
            0
            )
        eventPlayer.flytoggle += worldVector(vect(eventPlayer.getThrottle().x*0.3,0,0), eventPlayer, Transform.ROTATION) 
        wait()
    

    eventPlayer.enableEnvironmentCollision()
    eventPlayer.stopForcingPosition()
    eventPlayer.flytoggle = null

    wait(1)

rule "reload":
    @Event eachPlayer
    @Condition eventPlayer.isHoldingButton(Button.RELOAD)

    if eventPlayer.isHoldingButton(Button.INTERACT) and ring2 != null:
        eventPlayer.teleport(ring2)

    elif ring1 != null and not eventPlayer.isHoldingButton(Button.INTERACT):
         eventPlayer.teleport(ring1)

    wait()

