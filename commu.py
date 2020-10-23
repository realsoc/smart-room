

#!/usr/bin/env python
# -*- coding: utf-8 -*-
# lsusb to check device name
#dmesg | grep "tty" to find port name

import serial,time


if __name__ == '__main__':

	print('Running. Press CTRL-C to exit.')
	with serial.Serial("/dev/tty.usbserial-DA00VOAS", 9600, timeout=1) as arduino:
		time.sleep(0.1) #wait for serial to open
		if arduino.isOpen():
			print("{} connected!".format(arduino.port))
			try:
				while True:
					cmd=raw_input("Enter command : ")
					arduino.write(cmd.encode())
					#time.sleep(0.1) #wait for arduino to answer
					#while arduino.inWaiting()==0: pass
					#if  arduino.inWaiting()>0:
					#	answer=arduino.readline()
					#	print(answer)
					#	arduino.flushInput() #remove data after reading
					time.sleep(2) # with the port open, the response will be buffered
					# so wait a bit longer for response here
					# Serial read section
					msg = arduino.read(arduino.inWaiting()) # read everything in the input buffer
					print ("Message from arduino: ")
					print (msg)
					#arduino.flushInput()
			except KeyboardInterrupt:
				print("KeyboardInterrupt has been caught.")
