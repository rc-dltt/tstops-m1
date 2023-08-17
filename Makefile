server-up:
	docker compose -f ./server/final/docker-compose.yaml up -d

server-down:
	docker compose -f ./server/final/docker-compose.yaml down

server-build: server-gateway-compose
	docker compose -f ./server/final/docker-compose.yaml build

server-gateway-compose:
	cd server/final/gateway && \
	npm install && \
	npx rover supergraph compose \
		--elv2-license=accept \
		--config ./supergraph.yaml \
		> ./src/supergraph.graphql

client-ios:
	cd ./react/frontend-demo/demo && \
	npx react-native run-ios --port 8082

client-build-ios:
	cd react/frontend-demo/demo/ios && \
	pod install
	cd react/frontend-demo/demo && \
	npm run build:ios

run-ios: server-up client-ios