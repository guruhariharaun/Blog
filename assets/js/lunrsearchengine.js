
var documents = [{
    "id": 0,
    "url": "https://blog.thegurusec.com/404.html",
    "title": "404",
    "body": "404 Oops the Page doesnt exist!Please use the search bar at the top or visit my homepage! "
    }, {
    "id": 1,
    "url": "https://blog.thegurusec.com/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 2,
    "url": "https://blog.thegurusec.com/",
    "title": "Blogs",
    "body": "{% if page. url == “/” %}       Featured:       {% for post in site. posts %}    {% if post. featured == true %}      {% include featuredbox. html %}    {% endif %}  {% endfor %}  {% endif %}       All Stories:         {% for post in paginator. posts %}    {% include postbox. html %}    {% endfor %}    {% include pagination. html %}"
    }, {
    "id": 3,
    "url": "https://blog.thegurusec.com/robots.txt",
    "title": "",
    "body": "robots. txt for https://blog. thegurusec. comUser-agent: *Sitemap: {{ site. url }}/sitemap. xml "
    }, {
    "id": 4,
    "url": "https://blog.thegurusec.com/posts/How-to-get-Invite-code-in-Hack-The-Box/",
    "title": "How to get Invite code in Hack The Box",
    "body": "2022/01/17 -  Note: This blog is also posted on https://medium. com/ Before you read this blog, please visit https://hackthebox. eu and try to signup by yourself. If you face any issues or are pissed off then, read this blog.  DISCLAIMER: In Hack The Box, there are two types of invite challenges. Here, I covered one of them. If you encountered with another type then you can search it on google or close the applications and redo the process again. What is Hack The Box?: Hackthebox is an online penetration testing platform which use to test your skills in cybersecurity. It has numbers of Vulnerable Virtual machines, where you perform the pen-testing on the Vulnerable Virtual machine and capture User and Root Flags. Based on your points, the ranking would be provided and you would get badges. The badge might look like this: Many cybersecurity enthusiasts, beginners might have come across through https://hackthebox. eu. Also, they would have tried to create an account. But the catch here is you cannot easily register into your account.  Since this is a Capture The Flag style platform, you have to change your mindset and think accordingly. So come and start to Hack the Box with me 😄:  Firstly, go to the https://hackthebox. eu and click on the Join Now button.    You will be redirected to https://hackthebox. eu/invite   Now you have to crawl through the web page and search for any clue.  FYI: The favourite page for web application pentesters is the page source URL end-point and Inspector tab! 😉  Right-click on the page and open inspect element. As a shortcut by pressing ctrl + shift + C. (Be as Geek! ) and go to the console tab.  A cyberpunk styled Skull would have populated on your console Tab.  On the console, you may find This page loads an interesting javascript file. . See if you can find it :)”.  So now go to the sources Tab and inspect every file in the javascript folder.  You would find a suspicious file named inviteapi. min. js in which you could see some obfuscated javascript code. What is Obfuscation?:  The conversion of normal readable source code into an unreadable code called as obfuscation. It is something similar to encryption, but the beauty is the machine could able to read and execute.  To decode the obfuscated code in online there is numerous decoder available. But for now, I’m using an open-source application https://lelinhtinh. github. io/de4js   When I run the obfuscated javascript on the tool it might decode and output the code like this:   Looking closely you can predict or you may get some idea on the last few lines   We have concluded that the code hinted us to make a function call makeInviteCode(), which give us JSON data. So let’s try it out on our invite page.   Now here we could see that the server sent us an encrypted data on ROT13 cipher. What is ROT13?: ROT13 cipher(read as – “rotate by 13 places”) is a special case of the Ceaser cipher in which the shift is always 13. So every letter is shifted 13 places to encrypt or to decrypt the message.  Using an online tool, we can decrypt the ROT13 data. For the demonstration, I going to use https://rot13. com.  By processing the Encrypted data, you would get a sentence like this: to generate the invite code, make a POST request to /api/invite/generate Using the curl send a POST request to the Hack The Box’s Invite URL End-point appending the above path.  By now you would’ve got a response as in JSON format. What is a curl?: A curl is a command-line tool use to transfer data without the browser. We can perform any request, response headers on the command line itself, which would be very useful for developers. Also, this is a lightweight tool.  In the payload, there would be an encrypted string. But they haven’t mentioned the cipher or any encryption standard. hummmmm……. . : Could you able to find it? Ok, let me give you a clue. They mainly used for encoding binary data for embedding into HTML, CSS, EML, and other text documents. Also, It used to encode data that may be unsupported or damaged during transfer, storage, or output. What was that? Click here to reveal the answer!BASE64 Encoding :  This one might come only on practice and experience, so keep moving up!  To decrypt the Base64 data, I going to use an online tool https://base64decode. org.  By decoding the data, you will get the 25 characters Invite Code. Click on to reveal my Invite Code:WWXYD-JPILG-GCVTP-UPAWN-IHWJADon’t worry! you can’t use this invite code 😂. Try it on your own bro!    Now Paste the Invite code which you’ve got on the box and press Sign Up.     YAAY!🙌 You have solved the Hack The Box Invite Code Challenge 🔥. You can now sign up on the site and become a member.  I hope this post would be much Informative. If you like 👍 this post or If your friend who is interested in Cybersecurity💻, please share this. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});