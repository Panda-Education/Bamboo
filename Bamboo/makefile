

.PHONY:local-start
local-start:
	@docker-compose --file ./docker/Dockercompose.local.yaml --env-file ./docker/docker.local.env build --build-arg CACHE_BUST=$$(date +%s)
	@docker-compose --file ./docker/Dockercompose.local.yaml --env-file ./docker/docker.local.env up --force-recreate -d

.PHONY:local-stop
local-stop:
	@docker-compose --file ./docker/Dockercompose.local.yaml --env-file ./docker/docker.local.env down
