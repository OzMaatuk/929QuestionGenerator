'use strict';
/*
functions building proper urls for getting data from 929 upress db
*/
const URL929 = "http://bible.s40.upress.link/json/index.php?";

function get929ChapterURL (book, chapter)
    {
        let books_group = 'torah';
        //STATIC SET FOR SHMUEL
        if (book == 'i-samuel')
            books_group = 'prophets';

        let params = {
            "url": URL929,
            "action": "get_chapter_info",
            "books_group": books_group,
            "book": book,
            "chapter": chapter
        };
    
        let httpgeturl = params.url;
        httpgeturl += "action=" + params.action;
        httpgeturl += "&books_group=" + params.books_group;
        httpgeturl += "&book=" + params.book;
        httpgeturl += "&chapter=" + params.chapter;
    
        return httpgeturl;
    }

function get929DescriptionURL (post_id, description_id, post_type)
{
    let params = {
        "url": URL929,
        "action": "get_post_description",
        "post_id": post_id,
        "description_id": description_id,
        "post_type": post_type
    };

    let httpgeturl = params.url;
    httpgeturl += "action=" + params.action;
    httpgeturl += "&post_id=" + params.post_id;
    httpgeturl += "&description_id=" + params.description_id;
    httpgeturl += "&post_type=" + params.post_type;

    return httpgeturl;
}

module.exports = {
    get929URL: (type, var1, var2) =>
    {
        switch (type)
        {
            case "chapter":
                return get929ChapterURL(var1, var2);
            default:
                return get929DescriptionURL(var1, var2, type);
        }
    }
    
}