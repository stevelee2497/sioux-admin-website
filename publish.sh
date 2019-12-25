CURRENT_PATH=$(pwd)

echo "Cleaning ..."
rm -rf dist

echo "Building web packages ..."
yarn install && yarn umi build

echo "Send packages to server"
scp -C -i ~/.ssh/private_key -r dist ssh ubuntu@54.169.187.146:~/sioux-admin-website
ssh ubuntu@54.169.187.146 -i ~/.ssh/private_key "cd ~/sioux-admin-website;docker-compose up -d --build sioux-admin-website"
