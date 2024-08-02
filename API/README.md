tabbus-api
----------


go run main.go

## TODO

- env variables (might be solved by deploy? docker?)
- setup auth and build into riff/song controllers
- data validation? (tuning matches tabData, sequence IDs exist)
- simplify array data. Arrives as JSON string, save as JSON? 
  - Is there a better DB for storing JSON that still gives us hasMany?
  - COuld store entire song + riffs as NOSQL or document? But that would limit possibilities of making riffs independent of songs?


## Endpoints 

```
Index   GET   /songs
Create  POST  /songs
Read    GET   /songs/:id
Update  POST  /songs/:id
Create  POST  /riffs
Update  POST  /riffs/:id
```
