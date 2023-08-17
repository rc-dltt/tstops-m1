server-up:
	docker compose -f ./server/final/docker-compose.yaml up -d

server-down:
	docker compose -f ./server/final/docker-compose.yaml down

server-build: server-gateway-compose
	docker compose -f ./server/final/docker-compose.yaml build

server-gateway-compose:
	rover supergraph compose \
		--config ./server/final/gateway/supergraph.yaml \
		> ./server/final/gateway/src/supergraph.graphql
