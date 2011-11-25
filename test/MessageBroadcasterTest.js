/*
Puzzle pieces and game play are sent as messages between the two player's screens

Each screen knows what the other screen is doing (ie has a representation of the other screen's data structure) (think: Theory of Mind)

For example:

the admin player's game could send a puzzle piece to the child player's game

"deliver(piece3)"

the child player's game sends a screenshot or an update to the admin player's game so that the admin can see what the child sees, even if they are not in the same room. 

The child player's game also sends a video stream of the child's eye gaze to the admin player, if the option is turned on in the settings.

after a game recieves a broadcast it should acknowledge it back ot the sender. 

*/
