on getCurrentTrack()
    tell application "iTunes"
        if not (exists current track) then return null
        set json to "{" ¬
            & "\"name\": \"" & (get name of current track) & "\"," ¬
            & "\"time\": \"" & (get time of current track) & "\"," ¬
            & "\"artist\": \"" & (get artist of current track) & "\"," ¬
            & "\"album\": \"" & (get album of current track) & "\"" ¬
            & "\"rating\": \"" & (get rating of current track) & "\"" ¬
            & "\"plays\": \"" & (get played count of current track) & "\"" ¬
        & "}"
        
        return json
    end tell
end getCurrentTrack

on startPlaying()
    tell application "iTunes" to play
    return getCurrentTrack()
end startPlaying

on pausePlaying()
    tell application "iTunes" to pause
end pausePlaying

on stopPlaying()
    tell application "iTunes" to stop
end stopPlaying

on run argv
    set command to item 1 of argv
    if command is "play"
        startPlaying()
    else if command is "pause"
        pausePlaying()
    else if command is "stop"
        stopPlaying()
    end if
end run
