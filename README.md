# ftd-play
Creating a play app where you can create fpm package

## How to run backend (django)

1. Create a virtual environment.

```shell
python3 -m venv play-venv
source play-venv/bin/activate
```

2. Install requirements.txt

```shell
pip3 install -r requirements.txt
```

3. Runserver

```shell
python manage.py runserver
```

### In case of error like 
```
Symbol not found: _PQbackendPID
Expected in: flat namespace
```

1. Remove the existing virtual environment
2. Create a new virtual environment.

```shell
python3 -m venv play-venv
source play-venv/bin/activate
```

3. Install libpq

```shell
brew install libpq
echo 'export PATH="/usr/local/opt/libpq/bin:$PATH"' >> ~/.zshrc
export LDFLAGS="-L/usr/local/opt/libpq/lib"
export CPPFLAGS="-I/usr/local/opt/libpq/include"
```

4. Install requirements.txt

```shell
pip3 install -r requirements.txt
```

5. Runserver

```shell
python manage.py runserver
```


