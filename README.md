### Thank you for reviewing my code. I would appreciate feedback.

### Note
1. If `GitHub` API timeout, then `incomplete_results` attribute in will hold `false`.
2. If unable to find any users, the `users` attribute will be an empty array.
3. The input validation is performed in the model. The swagger spec is only used as documentation.
4. To have a higher rate set `github_token` in `task/.env` file.

Please check out this code and run the following commands.
- `make mooval-task-test` -  To execute all the tests
- `make mooval-task-start` - To start the server
- `make mooval-task-dev` - To use connect to the shell

### Specification
The server listens to port `9898`.
- `/spec/def` - To view the swagger specification.

   - `http://localhost:9898/spec/def`
- `/spec/docs` - To view a much better view of the specs.
   - `http://localhost:9898/spec/docs`

### API endpoint
Currently, only one endpoint is available.
- `/api/user.searchUsers` - to perform search operation

#### sample request
```
curl --request POST 'http://localhost:9898/api/user.searchUsers' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user": "test",
  "language": ["javascript", "typescript"]
}'
```

#### sample response
```json
{
    "incomplete_results": false,
    "users": [
        {
            "login": "astaxie",
            "name": "astaxie",
            "avatar_url": "https://avatars3.githubusercontent.com/u/233907?v=4",
            "followers": 13265
        },
        {
            "login": "testerSunshine",
            "name": "wenxianping",
            "avatar_url": "https://avatars1.githubusercontent.com/u/20162049?v=4",
            "followers": 811
        },
        {
            "login": "libenhe",
            "name": "test",
            "avatar_url": "https://avatars0.githubusercontent.com/u/10752102?v=4",
            "followers": 93
        }
    ]
}
```
## Folder structure
- `task` - the complete implementation
  - `lib` - contains the application
    - `app` - contains the `Express` application
    - `controllers` - controllers which are bound with `express` routes
      - `api` - all the operational endpoints
      - `spec` - all the specification related endpoints
    - `infrastructure` - contains the files required to handle external requests and configurations
      - `configs` - handle the `configurations`
      - `git` - handles `GitHub` connector
      - `http` - handles external `HTTP` calls
    - `models` - contains all the models and interfaces
      - `errors` - contains all the errors
      - `shared` - common interfaces
    - `operations` - contains operations such as `search`

## Configuration values
configurations are located in `task/.env`.

### Available configurations
- `github_endpoint` - GitHub endpoint.
- `github_token` - Personal Github token. (Not a mandatory value)
- `server_port` - Server port
