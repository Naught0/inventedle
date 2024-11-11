# Inventedle

Daily game where you guess the year of an invention

- Have guessing system like Costcodle (higher or lower maybe color coded)
- Reveal hints but lose points for doing so?
- Always show image of invention
- 4 or 5 guesses
- Cron job stores current invention ID in used_inventions w/ is_current = 1

TODO:
- [ ] Use a better colorscheme (muted-er?)
- [ ] Implement BC/AD toggle
- [ ] Add hint/tip/make-obvious how the bc/ad toggle works
- [ ] Impelement better rules
- [ ] Add help
    - Arrows describe direction of correct answer
    - Get within 10 years to win
    - >100 years off - Red
    - <100 years off - Yellow
    - <= 10 years off - Green
- [ ] Fix data
    - [ ] rust resistant metallurgy summary
    - [ ] general anaesthetic image
    - [ ] Charles dy[something] entry
    - [ ] Fix tiny image:
        - [ ] Soundcloud
        - [ ] Netflix
        - [ ] mobile banking
        - [ ] snythetic biology
- [ ] Censor `in \d\d\d\d` and other spoilers for display as a clue
- [ ] In after-game screen show bar graphs for statistics of average of players for the day
