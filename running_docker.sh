# This docker file tests the build and then pushes a deployable zip to an external folder 
docker build -t echo-test .
docker run --rm --mount src=c:/temp,target=/usr/src/app/lambda/custom/build,type=bind  echo-test
