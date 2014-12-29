#!/bin/sh
# http://www.xmlrpc.com/weblogsCom

site_name='なおしむ論'
site_url='http://naosim.sakura.ne.jp/blog/'

xmlrpc="<?xml version=\"1.0\"?>
<methodCall>
<methodName>weblogUpdates.ping</methodName>
<params>
<param>
<value>$site_name</value>
</param>
<param>
<value>$site_url</value>
</param>
</params>
</methodCall>
"
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://blog.with2.net/ping.php/174144/1129943084
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://blog.goo.ne.jp/XMLRPC
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://blog.with2.net/ping.php/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://blogsearch.google.co.jp/ping/RPC2
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://blogsearch.google.com/ping/RPC2
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://hamham.info/blog/xmlrpc/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.bloggers.jp/rpc/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.blogranking.net/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.cocolog-nifty.com/xmlrpc
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.exblog.jp/xmlrpc
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.fc2.com/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.feedburner.com
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.freeblogranking.com/xmlrpc/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.rootblog.com/rpc.php
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.rss.drecom.jp/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ping.sitecms.net
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://pingoo.jp/ping/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://ranking.kuruten.jp/ping
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://rpc.blogrolling.com/pinger/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://rpc.pingomatic.com/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://rpc.weblogs.com/RPC2
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://serenebach.net/rep.cgi
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://taichistereo.net/xmlrpc/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://www.bloglines.com/ping
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://www.i-learn.jp/ping/
curl -v -s -H "Content-Type: text/xml" -d "$xmlrpc" http://xping.pubsub.com/ping/
