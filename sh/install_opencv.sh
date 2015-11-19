sudo apt-get update
sudo apt-get upgrade

# Install prerequisites
sudo apt-get install build-essential cmake git pkg-config libjpeg8-dev libtiff4-dev libjasper-dev libpng12-dev libavcodec-dev libavformat-dev libswscale-dev libv4l-dev libgtk2.0-dev libatlas-base-dev gfortran

# Setup Python 3
wget https://bootstrap.pypa.io/get-pip.py
sudo python3 get-pip.py

sudo pip3 install virtualenv virtualenvwrapper

# virtualenv and virtualenvwrapper
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export WORKON_HOME=$HOME/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh

source ~/.bashrc

mkvirtualenv cv

sudo apt-get install python3.4-dev
pip install numpy

#3: Build and install OpenCV 3.0 with Python 3.4+ bindings
cd ~
git clone https://github.com/Itseez/opencv.git
cd opencv
git checkout 3.0.0

cd ~
git clone https://github.com/Itseez/opencv_contrib.git
cd opencv_contrib
git checkout 3.0.0

cd ~/opencv
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE \
	-D CMAKE_INSTALL_PREFIX=/usr/local \
	-D INSTALL_C_EXAMPLES=ON \
	-D INSTALL_PYTHON_EXAMPLES=ON \
	-D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib/modules \
	-D BUILD_EXAMPLES=ON ..
    
make -j4

sudo make install
sudo ldconfig

# Sym-link OpenCV 3.0

cd ~/.virtualenvs/cv/lib/python3.4/site-packages/
ln -s /usr/local/lib/python3.4/site-packages/cv2.cpython-34m.so cv2.so