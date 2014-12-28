is_master=`git branch|grep "*"|grep "master"`
if [ -z "$is_master" ] ; then
  echo "not master branch. please, switch master."
  exit 1
fi
git pull

FTP_SERVER="your.ftp.server.com"
USER_NAME="xxxxxxx"
PASSWORD="yyyyy"

cd myblog
../node_modules/hexo/bin/hexo g
lftp -u $USER_NAME,$PASSWORD -e "mirror --reverse --verbose public/. www/blog/." $FTP_SERVER<<END
bye
cd ..
END
