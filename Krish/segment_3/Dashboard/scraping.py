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
    browser = Browser('chrome', **executable_path, headless=True)

    # Run all scraping functions and store results in dictionary
    data = {"news": cardio_news(browser)}

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

        # Set the stage for scraping by finding the parent elements for the articles
        slide_elem = news_soup.find_all('div', class_='c-article-card__content')

    # ---------------- Obtain the titles and the corresponding paragraph texts----------------------

        # Define the list (of dictionaries) that will store the titles, and the associated paragraphs.
        news_article =[]

        # Create a loop to go to the first four articles
        for i in range (4):

            # Define the dictionary 
            news = {}

            # Retrieve the article title
            title = slide_elem[i].find('h4', class_='c-article-card__title').get_text()
            print(title)
            print("hello title")

            # Retrieve the paragraph text
            paragraph = slide_elem[i].find('p', class_='c-article-card__excerpt').get_text()
            print(paragraph)
            print("hellp para")

            # Add to the dictionary news_article
            news['title'] = title
            news['paragraph'] = paragraph

            # Append the news_article dictionary to the news_list
            news_article.append(news)

        
    except AttributeError:
        return None
    print("hello world)")
    print(news_article)

    return news_article


if __name__ == "__main__":
    
    # If running as script, print scraped data
    print(scrape_all())
