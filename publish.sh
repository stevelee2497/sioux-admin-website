CURRENT_PATH=$(pwd)

echo "Cleaning ..."
rm -rf dist

echo "Building web packages ..."
yarn install && yarn umi build

echo "Send packages to server"
scp -C -r dist ubuntu@192.168.236.128:~/sioux-admin-website
ssh ubuntu@192.168.236.128 "cd ~/sioux-admin-website;docker-compose up -d --build sioux-admin-website"
