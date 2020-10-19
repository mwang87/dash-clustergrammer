import dash_clustergrammer
import dash
from dash.dependencies import Input, Output
import dash_html_components as html
import pandas as pd

import json

external_scripts = [
    {'src': 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'},
    {'src': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'}
]
external_stylesheets = [{"external_url": 'custom.css'}]
    

app = dash.Dash(
    __name__,
    external_scripts=external_scripts,
    external_stylesheets=external_stylesheets
)

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

def _load_json():
    with open('example_clustergrammer.json', 'r') as f:
        network_data = json.load(f)
    
    return network_data

# utilizing code from 
# https://clustergrammer.readthedocs.io/matrix_format_io.html#matrix-format-io
# https://clustergrammer.readthedocs.io/clustergrammer_py.html#clustergrammer-py
def _load_toy_matrix():
    # make network object and load file
    from clustergrammer2 import Network
    import json
    net = Network()
    net.load_file('data/example_tsv.txt')

    # calculate clustering using default parameters
    net.cluster()

    return json.loads(net.export_net_json())


print('loading JSON Clustergrammer data...')
network_data = _load_json()
network_data = _load_toy_matrix()

print('done loading')

app.layout = html.Div([
    html.Link(
        rel='stylesheet',
        href='./static/custom.css'
    ),
    dash_clustergrammer.DashClustergrammer(
        id='cgram-component',
        label='Clustergrammer Dash Component',
        network_data=network_data,
    )
])

@app.server.route('/static/<path>')
def static_file(path):
    import os
    from flask import send_from_directory
    static_folder = os.path.join(os.getcwd(), 'static')
    return send_from_directory(static_folder, path)

if __name__ == '__main__':
    app.run_server(host="0.0.0.0", debug=True)
