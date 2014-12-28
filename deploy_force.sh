git pull

FTP_SERVER="your.ftp.server.com"
USER_NAME="xxxxxxx"
PASSWORD="yyyyy"

cd myblog
../node_modules/hexo/bin/hexo g
lftp -u $USER_NAME,$PASSWORD -e "mirror --reverse --verbose public/. www/blog/." $FTP_SERVER<<END
bye
END
