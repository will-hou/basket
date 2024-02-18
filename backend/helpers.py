from configparser import ConfigParser

def load_config(filename, section):

    if filename is None or section is None:
        raise Exception('Wrong parameters')
    
    parser = ConfigParser()
    parser.read(filename)

    config={}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            config[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return config
