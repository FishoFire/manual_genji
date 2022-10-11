

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

	createInWorldText(eventPlayer, "orb: {0} - set with Melee".format(orb) ,
		updateEveryTick( eventPlayer.getEyePosition() + vect(0,1,0) + eventPlayer.getFacingDirection() * 5  ),
		1, Clip.NONE, WorldTextReeval.VISIBILITY_POSITION_STRING_AND_COLOR, Color.LIME_GREEN, SpecVisibility.DEFAULT)
	
	createInWorldText(eventPlayer, "ring 1: {0} - set with interact + primary".format(ring1) ,
		updateEveryTick( eventPlayer.getEyePosition() + vect(0,1.2,0) + eventPlayer.getFacingDirection() * 5  ),
		1, Clip.NONE, WorldTextReeval.VISIBILITY_POSITION_STRING_AND_COLOR, Color.SKY_BLUE, SpecVisibility.DEFAULT)
	
	createInWorldText(eventPlayer, "ring 2: {0} - set with interact + secondary".format(ring2) ,
		updateEveryTick( eventPlayer.getEyePosition() + vect(0,1.4,0) + eventPlayer.getFacingDirection() * 5  ),
		1, Clip.NONE, WorldTextReeval.VISIBILITY_POSITION_STRING_AND_COLOR, Color.PURPLE, SpecVisibility.DEFAULT)

	createInWorldText(eventPlayer, "hostplayer: {0}".format(hostPlayer.getPosition()), 
		updateEveryTick( eventPlayer.getEyePosition() + vect(0,1.6,0) + eventPlayer.getFacingDirection() * 5  ),
		1, Clip.NONE, WorldTextReeval.VISIBILITY_POSITION_STRING_AND_COLOR, Color.ORANGE, SpecVisibility.DEFAULT)


	createEffect(getAllPlayers(), Effect.RING, Color.SKY_BLUE, ring1, 1, EffectReeval.POSITION_AND_RADIUS)
	createEffect(getAllPlayers(), Effect.RING, Color.PURPLE, ring2, 1, EffectReeval.POSITION_AND_RADIUS)
	createEffect(getAllPlayers(), Effect.ORB, Color.LIME_GREEN, orb, 1, EffectReeval.POSITION_AND_RADIUS)


/*


settings
{
	modes
	{
		Control
		{
			Limit Roles: 1 Tank 2 Offense 2 Support
		}

		Escort
		{
			Limit Roles: 1 Tank 2 Offense 2 Support
		}

		Hybrid
		{
			Limit Roles: 1 Tank 2 Offense 2 Support
		}

		Push
		{
			Limit Roles: 1 Tank 2 Offense 2 Support
		}
	}
}



rule ("grab location") {
    event {
        Ongoing - Each Player;
        All;
        All;
    }
    conditions {
        Is Button Held(Event Player, Button(Interact)) == True;
    }
    actions {
        Small Message(Event Player, Position Of(Event Player));
    }
}
*/
