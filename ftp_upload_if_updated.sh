lftp_path=`which lftp`
if [ ${#lftp_path} == 0 ]; then
	echo "no lftp command"
	exit 1
fi

git fetch
current=`git log --oneline master -1`
origin=`git log --oneline origin/master -1`
echo "current: $current"
echo "origin: $origin"
[ "$current" = "$origin" ] ; exit 0

sh deploy_force.sh
