lftp_path=`which lftp`
if [ ${#lftp_path} == 0 ]; then
	echo "no lftp command"
	exit 1
fi

str=`git fetch`
if [ ${#str} == 0 ]; then
	echo "no update"
	exit 0
fi

FTP_SERVER="your.ftp.server.com"
USER_NAME="xxxxxxx"
PASSWORD="yyyyy"

cd myblog
../node_modules/hexo/bin/hexo g
lftp -u $USER_NAME,$PASSWORD -e "mirror --reverse --verbose public/. www/blog/." $FTP_SERVER<<END
bye
END
