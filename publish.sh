CURRENT_PATH=$(pwd)

echo "Cleaning ..."
rm -rf dist

echo "Building web packages ..."
yarn install && yarn umi build

echo "Send packages to server"
scp -C -r dist ssh ubuntu@52.187.169.33:~/sioux-admin-website
ssh ubuntu@52.187.169.33 "cd ~/sioux-admin-website;docker-compose up -d --build sioux-admin-website"
