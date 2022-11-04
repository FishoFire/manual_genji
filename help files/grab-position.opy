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
            ],
            "general": {
                "abilityCooldown%": 0,
                "damageDealt%": 10,
                "damageReceived%": 10,
                "healingDealt%": 10,
                "healingReceived%": 500,
                "health%": 500
            }
        }
    }
}


globalvar ring1
globalvar ring2
globalvar orb
globalvar kill1pos
globalvar kill1rad

playervar Flymode
playervar flytoggle
playervar killfx
playervar bouncefx

rule "pause time":
	wait(10) 
	pauseMatchTime()
    createEffect(getAllPlayers(), Effect.RING, Color.SKY_BLUE, ring1, 1, EffectReeval.POSITION_AND_RADIUS)
	createEffect(getAllPlayers(), Effect.RING, Color.PURPLE, ring2, 1, EffectReeval.POSITION_AND_RADIUS)
	createEffect(getAllPlayers(), Effect.ORB, Color.LIME_GREEN, orb, 1, EffectReeval.POSITION_AND_RADIUS)
    createEffect(getAllPlayers(), Effect.SPHERE, Color.BLUE, kill1pos,kill1rad, EffectReeval.POSITION_AND_RADIUS)
    kill1rad = 1

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
    @Condition not eventPlayer.isHoldingButton(Button.INTERACT)
	@Condition eventPlayer.isHoldingButton(Button.MELEE)
	orb = eventPlayer.getPosition()


rule "kill orb pos":
    @Event eachPlayer
    @Condition eventPlayer.isHoldingButton(Button.INTERACT)
    @Condition eventPlayer.isHoldingButton(Button.MELEE)
    kill1pos = eventPlayer.getPosition()

rule "kill orb rad":
    @Event eachPlayer
    @Condition eventPlayer.isHoldingButton(Button.INTERACT)
    @Condition eventPlayer.isHoldingButton(Button.JUMP) or eventPlayer.isHoldingButton(Button.CROUCH)
    kill1rad += 0.1  if eventPlayer.isHoldingButton(Button.JUMP) else -0.1
   
rule "kill display":
    @Event eachPlayer
    @Condition distance(eventPlayer, kill1pos) < kill1rad
    @Condition kill1pos != null

    #createEffect(getAllPlayers(), Effect.BAD_AURA, Color.RED, eventPlayer.getEyePosition()+eventPlayer.getFacingDirection(), 0.3, EffectReeval.POSITION_AND_RADIUS)
    #eventPlayer.killfx = getLastCreatedEntity()
    eventPlayer.setStatusEffect(null,Status.BURNING,9999)
    waitUntil(distance(eventPlayer, kill1pos) > kill1rad, 9999)
    eventPlayer.clearStatusEffect(Status.BURNING)
    #destroyEffect(eventPlayer.killfx)

rule "bounce display":
    @Event eachPlayer
    @Condition distance(eventPlayer, orb) < 1.4
    @Condition orb != null

    playEffect(eventPlayer, DynamicEffect.BUFF_EXPLOSION_SOUND, Color.WHITE, eventPlayer, 75)
    createEffect(getAllPlayers(), Effect.CLOUD, Color.LIME_GREEN, eventPlayer, 1, EffectReeval.POSITION_AND_RADIUS)
    
    eventPlayer.bouncefx = getLastCreatedEntity()

    waitUntil(distance(eventPlayer, orb) > 1.4, 9999)
    destroyEffect(eventPlayer.bouncefx)


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
	
    hudHeader(eventPlayer, "kill:{0} - radius:{1}".format(kill1pos,kill1rad), HudPosition.LEFT, 30, Color.BLUE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
	hudSubheader(eventPlayer, "set with interact(first) + melee\nsize: interact + jump/crouch\n", HudPosition.LEFT, 31, Color.BLUE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)

    hudHeader(eventPlayer, "hostplayer: {0}   ".format(hostPlayer.getPosition()), HudPosition.LEFT, 50, Color.ORANGE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)

    hudHeader(eventPlayer, "Reload: reset ring 1, +interact ring 2", HudPosition.RIGHT, 40, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)

    # left
    hudHeader(eventPlayer, "Fly toggle: deflect", HudPosition.RIGHT, 30, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)
    hudSubheader(eventPlayer, "jump/crouch to fly faster\n", HudPosition.RIGHT, 31, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)

  
rule "give ult":
    @Event eachPlayer
    @Condition eventPlayer.getUltCharge() < 100
    @Condition eventPlayer.isUsingUltimate() == false
    wait(0.1)
    eventPlayer.setUltCharge(100)
    if RULE_CONDITION:
        goto RULE_START

  
rule "dash cd":
    @Event eachPlayer
    @Hero genji
    @Condition eventPlayer.getAbilityCooldown(Button.ABILITY_1) > 0
    @Condition not eventPlayer.isUsingAbility1()
    wait(0.1)
    smallMessage(eventPlayer,"test")
    eventPlayer.setAbilityCooldown(Button.ABILITY_1,0)
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



rule "facing": # secret
    @Event eachPlayer
    @Condition eventPlayer.isHoldingButton(Button.JUMP)
    @Condition eventPlayer.isHoldingButton(Button.CROUCH)
    @Condition eventPlayer.isHoldingButton(Button.ULTIMATE)
    @Condition eventPlayer.isHoldingButton(Button.INTERACT)

    hudHeader(eventPlayer, "your facing: {0}".format(eventPlayer.getFacingDirection()), HudPosition.RIGHT, 55, Color.WHITE, HudReeval.VISIBILITY_AND_STRING, SpecVisibility.DEFAULT)


    #jummp + crouch + ult + interact