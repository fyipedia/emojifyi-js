Output demo.gif
Set FontSize 14
Set Width 920
Set Height 580
Set Shell "zsh"
Set Theme "Catppuccin Mocha"
Set TypingSpeed 30ms
Set Padding 20

Type "node"
Enter
Sleep 1s

Type "const { getEmojiByChar, encode, search } = await import('emojifyi')"
Enter
Sleep 1.5s

Type "getEmojiByChar('🎉')"
Enter
Sleep 2.5s

Type "encode('🔥')"
Enter
Sleep 2.5s

Type "search('heart', 3)"
Enter
Sleep 2.5s

Type ".exit"
Enter
Sleep 1s
