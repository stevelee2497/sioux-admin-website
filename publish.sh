CURRENT_PATH=$(pwd)
OUTPUT_PATH="${CURRENT_PATH}/build-api"

echo "Cleaning ..."
rm -rf dist

echo "Building web packages ..."
yarn install && yarn umi build

echo "Send packages to server"
scp -C -r dist ubuntu@192.168.236.128:~/sioux-admin-web
ssh ubuntu@192.168.236.128 "cd ~/sioux-admin-web;docker-compose up -d --build sioux-admin-web"

cd "${CURRENT_PATH}"
