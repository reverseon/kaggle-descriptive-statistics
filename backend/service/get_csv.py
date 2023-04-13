import os

os.environ['KAGGLE_CONFIG_DIR'] = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', 'creds')
)

from kaggle.api.kaggle_api_extended import KaggleApi


def get_csv_filename(url: str) -> str:
    api = KaggleApi()
    api.authenticate()
    # download the dataset
    PATH = './data'
    # get the dataset name and author
    dataset_name = url.split('/')[-1]
    author = url.split('/')[-2]
    # make dir if it doesn't exist and clean if it does
    if not os.path.exists(PATH):
        os.mkdir(PATH)
    else:
        for file in os.listdir(PATH):
            os.remove(os.path.join(PATH, file))
    api.dataset_download_files(
        author + '/' + dataset_name
        , path=PATH, unzip=True)
    csv_file = [file for file in os.listdir(PATH) if file.endswith('.csv')][0]
    return os.path.join(PATH, csv_file)
