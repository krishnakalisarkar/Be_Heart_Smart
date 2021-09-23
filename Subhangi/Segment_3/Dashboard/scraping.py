# Import Splinter and BeautifulSoup
from splinter import Browser
from bs4 import BeautifulSoup as soup
import pandas as pd
import datetime as dt
from webdriver_manager.chrome import ChromeDriverManager


def scrape_all():
    # Initiate headless driver for deployment
    # Set up Splinter
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    news_title, news_paragraph = cardio_news(browser)

    # Run all scraping functions and store results in dictionary
    data = {
        "news_title": news_title,
        "news_paragraph": news_paragraph,
        # "featured_image": featured_image,
        "last_modified": dt.datetime.now()
    }

    # Stop webdriver and return data
    browser.quit()

    return data


def cardio_news(browser):

    # Scrape News
    # Visit the American Heart Association news site
    url= 'https://www.heart.org/en/news/healthy-living'
    browser.visit(url)

    # Parse the HTML, convert the browser HTML to a soup object
    html = browser.html
    news_soup = soup(html, 'html.parser')

    # Add try/except for error handling
    try:

        # Set the stage for scraping by finding the parent element
        slide_elem = news_soup.select_one('div', class_='c-article-card__content')

    # ---------------- Scrape the title----------------------

        news_title = slide_elem.find('h4', class_='c-article-card__title').get_text()
        
    # -----------------Scrape the paragraph------------------

        # Use the parent element to find the paragraph text
        news_p = slide_elem.find('p', class_='c-article-card__excerpt').get_text()
    
    # ---------------Scrape the correspoding image-----------

    #     # Find the base url
    #     img_url_rel = slide_elem.find('img').get('src')
    
    # # Use the base URL to create an absolute URL
    #     img_url = f'https://www.heart.org{img_url_rel}'
       
    except AttributeError:
        return None, None, None

    return news_title, news_p


if __name__ == "__main__":
    
    # If running as script, print scraped data
    print(scrape_all())





