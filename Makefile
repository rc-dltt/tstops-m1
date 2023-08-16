server-build:
	docker compose -f ./server/final/docker-compose.yaml build

server-up:
	docker compose -f ./server/final/docker-compose.yaml up -d

server-down:
	docker compose -f ./server/final/docker-compose.yaml down
