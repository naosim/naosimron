# lftp command check
lftp_path=`which lftp`
if [ ${#lftp_path} == 0 ]; then
  echo "no lftp command"
  exit 1
fi

# current branch check
is_master=`git branch|grep "*"|grep "master"`
if [ -z "$is_master" ] ; then
  echo "not master branch. please, switch master."
  exit 1
fi

# ftp server config
FTP_SERVER="your.ftp.server.com"
USER_NAME="xxxxxxx"
PASSWORD="yyyyy"

# run
git pull
cd myblog
../node_modules/hexo/bin/hexo g
lftp -u $USER_NAME,$PASSWORD -e "mirror --reverse --verbose public/. www/blog/." $FTP_SERVER<<END
bye
END
cd ..
