watch:
	cd frontend && npm start

server:
	./gradlew bootRun

# Build jar for production with bundled frontend
buildProd:
	npm build && ./gradlew build

# then open localhost:8080
runJar: buildProd
	java -jar build/libs/demo
