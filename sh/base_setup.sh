#!/bin/bash

name="norkart"

hidden_dir="/home/$name/.$name"

export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8

echo  "Installing needed packages"

sudo apt-get update

sudo apt-get -y install python-software-properties build-essential curl python-pycurl

# Installing Python dependencies
sudo apt-get -y install python-dev freetds-dev python-pip libpq-dev python-virtualenv unzip

sudo add-apt-repository ppa:ubuntugis/ubuntugis-unstable
sudo apt-get update
sudo apt-get -y install libgdal1h libgdal-dev python-gdal